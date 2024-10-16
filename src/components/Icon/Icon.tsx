import { ReactComponent as Delete } from "assets/Delete.svg";
import { ReactComponent as Edit } from "assets/Edit.svg";
import { ReactComponent as Add } from "assets/Add.svg";
import { ADD, DELETE, EDIT } from "constants/icons";

type IProps = {
    name: string;
    className?: string;
    style?: { width: number; height: number };
    onClick?: () => void;
};

const Icons = {
    [DELETE]: Delete,
    [EDIT]: Edit,
    [ADD]: Add,
};

const Icon = (props: IProps) => {
    const { name } = props;
    const Component = Icons[name as keyof typeof Icons];

    return <Component {...props} />;
};

export default Icon;
