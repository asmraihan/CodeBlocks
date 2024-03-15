
import { LoadingSpinner } from "@/components/ui/loading-spinner";


const Loading = () => {
  return ( 
    <div className="flex h-full w-full items-center justify-center mt-[40vh]">
        <LoadingSpinner size={80} />
    </div>
   );
}
 
export default Loading;