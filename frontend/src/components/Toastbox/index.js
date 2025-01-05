
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toastbox(type,message, autoClose){
    switch(type) {
        case "success":
            return toast.success(message,{hideProgressBar: false,autoClose:autoClose==="false" ? false : 5000})
        case "warning":
            return  toast.warning(message,{hideProgressBar: false,autoClose: 10000})
        case "error":
            return toast.error(message,{hideProgressBar: false, autoClose:autoClose==="false" ? false : 5000 })
        case "activityMessage":
            return toast.success(message,{hideProgressBar:false,autoClose:autoClose==="false" ? false : 15000})          
        default:
          return toast.info(message,{toastClassName:"dark-toast",hideProgressBar: true,autoClose:autoClose==="false" ? false : 5000000 }) 
        }
    
}


export default Toastbox;