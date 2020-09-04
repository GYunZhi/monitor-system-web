<template>
  <form method="post">
    <textarea :id='id' :value='value'></textarea>
  </form>
</template>

<script>
// import { getItem } from '@/utils/auth'
export default {
  name: 'CEditor',
  props: {
    options: {
      default: () => {
        return {}
      },
      required: false,
      type: Object
    },
    value: {
      default: () => '',
      required: false,
      type: String
    },
    url: { // 接口地址
      default: '/api/oss/upload?isLocation=0',
      type: String
    },
    withCredentials: {
      default: false,
      type: Boolean
    },
    accept: { // 文件类型
      default: 'image/jpeg, image/png',
      type: String
    },
    maxSize: { // 大小
      default: 1024 * 1024 * 2,
      type: Number
    }
  },
  data () {
    return {
      id: new Date().getTime(),
      instance: null,
      tinymce: '',
      accessToken: ''
    }
  },
  mounted () {
    // this.accessToken = getItem('smart-admin-token').access_token
    this.mountedInit()
  },
  methods: {
    mountedInit () {
      const _this = this
      if (typeof window === 'undefined') return
      require.ensure(['tinymce'], require => {
        this.tinymce = require('tinymce')
        require('tinymce/themes/modern')
        require('tinymce/plugins/code')
        require('tinymce/plugins/image')
        require('tinymce/plugins/imagetools')
        require('tinymce/plugins/link')
        require('tinymce/plugins/paste')
        require('tinymce/plugins/wordcount')
        require('tinymce/plugins/table')
        require('tinymce/plugins/lists')
        require('tinymce/plugins/fullscreen')
        require('tinymce/plugins/preview')

        this.tinymce.init(Object.assign({
          language_url: process.env.ROUTER_BASE + 'static/tinymce/zh_CN.js',
          language: 'zh_CN',
          skin_url: process.env.ROUTER_BASE + 'static/tinymce/skins/lightgray',
          selector: '#' + this.id,
          init_instance_callback (editor) {
            this.instance = editor
            console.log('Editor: ' + editor.id + ' is now initialized.')
          },
          plugins: [ 'link', 'table', 'code', 'paste', 'lists', 'image', 'imagetools', 'wordcount', 'fullscreen', 'preview' ],
          toolbar: 'code | undo redo | styleselect | alignleft aligncenter, alignright alignjustify | fontselect fontsizeselect bold italic | bullist, numlist table | link image | fullscreen preview',
          fontsize_formats: '8px 10px 12px 14px 18px 24px 36px',
          menubar: false,
          image_advtab: true,
          paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传
          paste_merge_formats: true,
          // 图片上传
          images_upload_handler (blobInfo, success, failure) {
            if (blobInfo.blob().size > _this.maxSize) {
              failure('文件体积过大')
            }
            if (_this.accept.indexOf(blobInfo.blob().type) >= 0) {
              _this.uploadPic(blobInfo, success, failure)
            } else {
              failure('图片格式错误')
            }
          },
          paste_postprocess: function (plugin, args) {
            console.log(args.node)
            args.node.setAttribute('id', '42')
          }
        }, this.options))
      })
    },
    uploadPic (blobInfo, success, failure) {
      const xhr = new XMLHttpRequest()
      let formData = new FormData()
      xhr.withCredentials = this.withCredentials
      xhr.open('POST', this.url)
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
      xhr.setRequestHeader('Authorization', `Bearer${this.accessToken}`)
      xhr.onload = () => {
        if (xhr.status !== 200) {
          // 抛出 'on-upload-fail' 钩子
          this.$emit('on-upload-fail')
          failure('上传失败: ' + xhr.status)
          return
        }
        const json = JSON.parse(xhr.responseText)
        // 抛出 'on-upload-success' 钩子
        this.$emit('on-upload-success', [
          json, success, failure
        ])
      }
      xhr.onerror = () => {
        this.$emit('on-error', '上传失败')
      }
      formData.append('file', blobInfo.blob())
      xhr.send(formData)
    }
  }
}
</script>
