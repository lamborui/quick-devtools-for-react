import { useEffect, useState } from 'react'

const SelectOption = (props) => {
  const [selected, setSelected] = useState(false)
  const {
    label,
    value,
    className = '',
    handleSelect,
    defaultValue,
    children,
  } = props

  useEffect(() => {
    if (defaultValue === value) setSelected(true)
  }, [value, defaultValue])

  const onClickHandle = (e) => {
    handleSelect({ value: value, label: label || value })
  }

  return (
    <div
      className={`brv-select-option ${className} ${
        selected ? 'brv-selected' : ''
      }`}
      onClick={onClickHandle}
    >
      {children || label || value}
    </div>
  )
}

export default SelectOption
