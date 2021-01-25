import { ContentHeaderBar } from "../components/ContentHeaderBar";
import { MainList } from "../components/MainList";

export function Content(props){
    return(
        <>
        <div className="grid bg-white p-5">
            <ContentHeaderBar {...props} />
            <MainList {...props} />
        </div>
        </>
    )
}