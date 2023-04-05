// import AntdFormPage from "./pages/AntdFormPage";
import MyRCFieldForm from "./pages/MyRCFieldForm";

export default function App(props) {
  return (
    <div>
      {/* <AntdFormPage /> */}
      <MyRCFieldForm />
    </div>
  );
}
/**由于表单不想要全量更新，只关注单个部位如输入框的局部更新，所以不能使用d3的方案(HOC),需要自定义一个状态管理库 */
