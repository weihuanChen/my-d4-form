import FieldContext from "./FieldContext";
import useForm from "./useForm";
export default function Form({ children, form, onFinish, onFinishFailed }) {
  const [formInstance] = useForm(form);
  form.setCallbacks({
    onFinish,
    onFinishFailed,
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        //禁止调默认更新
        form.submit();
      }}
    >
      <FieldContext.Provider value={formInstance}>{children}</FieldContext.Provider>
    </form>
  );
}
