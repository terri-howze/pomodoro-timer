import TitleUpdate from "@/app/titleUpdate";
import { useStateStore } from "@/store/Store";



// async function generateMetadata() {
//   const timeRemaining = useStateStore((state) => state.timeRemaining) // Get Zustand state

//   return {
//     title: timeRemaining > 0 ? `Time Left: ${timeRemaining}s` : 'My App',
//   };
// }
export default function timerpage({children}) {
    return ( 
            <section>{children}</section>
        

        
      );
    }
  