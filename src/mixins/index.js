const mixin = {
  methods: {
    // 处理element-ui Table表头单元格样式
    getTableHeadCellStyle ({ row, column, rowIndex, columnIndex }) {
      let style = 'background-color:#F3F4F7;border-top: 1px solid #ebeef5;'
      if (columnIndex === 0) {
        style = `${style}border-left: 1px solid #ebeef5;`
      } else if (columnIndex === row.length - 1) {
        style = `${style}border-right: 1px solid #ebeef5;`
      }
      return style
    }
  }
}

export default mixin
