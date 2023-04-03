import { useRef } from "react";

class FormStore {
  constructor() {
    this.store = {};
    this.fieldEntities = []; //保存当前field的实例

    this.callbacks = {};
  }
  setCallbacks = (callbacks) => {
    this.callbacks = { ...this.callbacks, ...callbacks };
  };
  //注册实例(forceUpdate)
  registerFieldEntities = (entity) => {
    this.fieldEntities.push(entity);

    return () => {
      this.fieldEntities = this.fieldEntities.filter((item) => item !== entity);
      delete this.store[entity.props.name];
    };
  };

  //取消注册
  //订阅
  //取消订阅

  //get
  getFieldsValue = () => {
    return { ...this.store };
  };
  getFieldValue = (name) => {
    return this.store[name];
  };
  //set
  //password:123
  setFieldValue = (newStore) => {
    //1 update Store
    //注意合并的先后顺序
    this.store = {
      ...this.store,
      ...newStore,
    };
    //2 update Field
    this.fieldEntities.forEach((entity) => {
      Object.keys(newStore).forEach((k) => {
        if (k === entity.props.name) {
          entity.onStoreChange();
        }
      });
    });
  };
  submit = () => {
    console.log("提交");
    let err = this.validate();
    const { onFinish, onFinishFailed } = this.callbacks;
    if (err.length === 0) {
      //校验通过
      onFinish(this.getFieldsValue());
    } else {
      //没通过
      onFinishFailed(err, this.getFieldsValue());
    }
  };
  validate = () => {
    let err = [];
    //todo校验
    return err;
  };
  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldValue: this.setFieldValue,
      registerFieldEntities: this.registerFieldEntities,
      submit: this.submit,
      setCallbacks: this.setCallbacks,
    };
  };
}
export default function useForm() {
  //把组件实例挂载到fiber上，通过useRefAPI
  //这样使表单状态和组件绑定
  //存一个值,在组件卸载之前都是同一个
  const formRef = useRef();
  if (!formRef.current) {
    const fromStore = new FormStore();
    formRef.current = fromStore.getForm();
  }
  return [formRef.current];
}
