import React, {FC} from 'react';

type Props = {
  value: number
  onChange: (e: any) => void
  prefix: string
  suffix: string
};

const ValueInput: FC<Props> = ({
  value,
  onChange,
  prefix,
  suffix
}) => (
  <div
    className="relative rounded shadow w-52"
  >
    <div
      className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-2"
    >
      <span>{prefix}</span>
    </div>
    <input
      type="number"
      step="0.1"
      className="shadow appearance-none border rounded w-full py-2 pl-16 pr-10
     text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      value={value}
      onChange={onChange}
    />
    <div
      className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2"
    >
      <span>{suffix}</span>
    </div>
  </div>
);

export default ValueInput;
