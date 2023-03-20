import Success from "../../../components/auth/Success/Success";

export default function ResetSuccessful({
  setValue,
  value,
}: {
  setValue: any;
  value: string;
}) {
  return <Success type="reset" value={value} setValue={setValue} />;
}
