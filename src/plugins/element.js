import Vue from 'vue'

import {
  Table,
  TableColumn,
  Col,
  Row,
  Button,
  Form,
  FormItem,
  Input,
  InputNumber,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Radio,
  RadioGroup,
  RadioButton,
  Pagination,
  Loading,
  Dialog,
  MessageBox,
  Select,
  Option,
  OptionGroup,
  DatePicker,
  Popover,
  Dropdown,
  DropdownMenu,
  Tooltip,
  Carousel,
  CarouselItem,
  DropdownItem,
  Scrollbar
} from 'element-ui'

import { message } from '../utils/refactorMessage'

// 安装全局 element-ui 组件
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Col)
Vue.use(Row)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(CheckboxButton)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Pagination)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(DatePicker)
Vue.use(Popover)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Tooltip)
Vue.use(Scrollbar)

Vue.prototype.$message = message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert
