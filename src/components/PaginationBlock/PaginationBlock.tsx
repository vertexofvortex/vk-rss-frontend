import { Pagination, PaginationProps } from "@mantine/core";

interface Props extends Omit<PaginationProps, "total" | "onChange" | "value"> {
  itemsTotal: number;
  pageLength: number;
  actions: [number, React.Dispatch<React.SetStateAction<number>>];
}

export function PaginationBlock({
  itemsTotal,
  pageLength,
  actions,
  ...mantineProps
}: Props) {
  return (
    <Pagination
      {...mantineProps}
      total={Math.ceil(itemsTotal / pageLength)}
      value={actions[0]}
      onChange={actions[1]}
    />
  );
}

export default PaginationBlock;
