import Success from "../../../components/auth/Success/Success";

export default function CreateSuccessful({
  setValue,
  value,
}: {
  setValue: any;
  value: string;
}) {
  return <Success type="create" value={value} setValue={setValue} />;
}
