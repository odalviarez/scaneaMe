
const SelectField = (props) => {
  const { label, handleChange, name } = props;
  return (
    <div className="mb-5">
      <label className="text-gray-500 text-sm" htmlFor={name}>{label}</label>
      <select onChange={handleChange} defaultValue="role" name={name} className="w-full border-b-2 py-2 outline-none">
        <option value="role" disabled>Seleccione Motivo</option>
        <option value="frontEnd" className="py-1">Desarrollo</option>
        <option value="backEnd" className="py-1">Queja</option>
        <option value="qa" className="py-1">Administrativo</option>
        <option value="backEnd" className="py-1">Otro</option>
        
      </select>
    </div>
  )
}

export default SelectField
