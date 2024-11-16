import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";

export default function RadioButton({ selectedValue, handleChange }) {
  const CustomRadio = withStyles({
    root: {
      color: "#2e1065",
      "&$checked": {
        color: "#5b21b6",
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  return (
    <div className="text-zinc-50 text-base font-semibold mt-6 -ml-3 flex justify-center flex-row">
      <span>
        <CustomRadio checked={selectedValue === 'all'} onChange={e => handleChange(e.target)} value="all" />
        <span className="text-base font-medium text-zinc-200">Todos</span>
      </span>
      <span>
        <CustomRadio checked={selectedValue === 'true'} onChange={e => handleChange(e.target)} value="true" />
        <span className="text-base font-medium text-zinc-200">Prioridade</span>
      </span>
      <span>
        <CustomRadio checked={selectedValue === 'false'} onChange={e => handleChange(e.target)} value="false" />
        <span className="text-base font-medium text-zinc-200">Normal</span>
      </span>
    </div>
  );
}