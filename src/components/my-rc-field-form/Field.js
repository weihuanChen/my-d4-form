import React, { Component } from "react";
import FieldContext from "./FieldContext";
export default class Field extends Component {
  //消费 context
  static contextType = FieldContext;

  //挂载的时候注册
  componentDidMount() {
    this.unregister = this.context.registerFieldEntities(this);
  }
  componentWillUnmount() {
    this.unregister();
  }
  onStoreChange = () => {
    this.forceUpdate();
  };
  getControlled = () => {
    //解构
    const { getFieldValue, setFieldValue } = this.context;
    const { name } = this.props;
    return {
      value: getFieldValue(name),
      onChange: (e) => {
        const newValue = e.target.value;
        setFieldValue({ [name]: newValue });
        console.log("newValue", newValue);
      },
    };
  };
  render() {
    const { children } = this.props;

    //使用cloneElement生成一个react节点
    const returnChildNode = React.cloneElement(children, this.getControlled());
    return returnChildNode;
  }
}
// export default function Field(props) {
//   const { children, name } = props;
//   const { getFieldValue, setFieldsValue, registerFieldEntities } =
//     React.useContext(FieldContext);

//   const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

//   React.useLayoutEffect(() => {
//     const unregister = registerFieldEntities({
//       props,
//       onStoreChange: forceUpdate,
//     });
//     return unregister;
//   }, []);

//   const getControlled = () => {
//     return {
//       value: getFieldValue(name), //"omg", // get state
//       onChange: (e) => {
//         const newValue = e.target.value;
//         // set state
//         setFieldsValue({ [name]: newValue });
//       },
//     };
//   };

//   const returnChildNode = React.cloneElement(children, getControlled());
//   return returnChildNode;
// }
