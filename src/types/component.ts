
enum PositionType {
    relative,
    absolute
}
//   组件类型
enum KeyType {
    block = "区块",
    input = "输入框",
    text = "文本",
    select = "选择框",
    colum = "分栏"
}
type Types = keyof typeof KeyType;
export interface ComponentBase {
    id: string | number;
    parentId: string | number;
    top: number;
    left: number;
    zIndex: number;
    key: Types;
    name: string;
    attr:{
        colNum?:string;
        width?: number;
        height?: number;
        backgroundColor?: string;
        position?: PositionType
    };
    position: PositionType;
    alignCenter: string
}
export interface Component extends ComponentBase{
    blocks?: Array<Component>
}
export interface CanvasData extends ComponentBase{
    blocks?: Array<Component>
    attr: {
        width?: number;
        height?: number;
        backgroundColor?: string;
        position?: PositionType
    };
    key: string;
    id: string | number
}
