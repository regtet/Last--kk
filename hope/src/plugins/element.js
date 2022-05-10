import Vue from "vue";
import {
    Button,
    Form,
    FormItem,
    Input,
    Row,
    Col,
    Menu,
    MenuItem,
    MenuItemGroup,
    Submenu,
    Radio,
    RadioButton,
    RadioGroup,
    Breadcrumb,
    BreadcrumbItem,
    Table,
    TableColumn,
    Pagination,
    Switch,
    Dialog,
    Select,
    Option,
    Tag,
    Tree,
    Cascader,
    Timeline,
    TimelineItem,
    Step,
    Steps,
    Tabs,
    TabPane,
    Upload,
    CheckboxGroup,
    Checkbox,
} from "element-ui";
let arr = [
    Button,
    Form,
    FormItem,
    Input,
    Row,
    Col,
    Menu,
    MenuItem,
    MenuItemGroup,
    Submenu,
    Radio,
    RadioButton,
    RadioGroup,
    Breadcrumb,
    BreadcrumbItem,
    Table,
    Pagination,
    TableColumn,
    Switch,
    Dialog,
    Select,
    Option,
    Tag,
    Tree,
    Cascader,
    Timeline,
    TimelineItem,
    Step,
    Steps,
    Tabs,
    TabPane,
    Upload,
    CheckboxGroup,
    Checkbox,
];
for (let index = 0; index < arr.length; index++) {
    Vue.use(arr[index]);
}

// Vue.use(Button);
// Vue.use(Form);
// Vue.use(FormItem);
// Vue.use(Input);
// Vue.use(Row);
// Vue.use(Col);
// Vue.use(Menu);
// Vue.use(MenuItem);
// Vue.use(MenuItemGroup);