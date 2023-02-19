import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class ErrorHandler {
    httpErrorHandler(error) {
        if (error === null) throw new Error('Unrecoverable error!! Error is null!')
        if (axios.isAxiosError(error)) {
          //here we have a type guard check, error inside this if will be treated as AxiosError
          const response = error?.response
          const request = error?.request
          const config = error?.config //here we have access the config used to make the api call (we can make a retry using this conf)
      
          if (error.code === 'ERR_NETWORK') {
            console.log('connection problems..')
            toast.error("Connection problems..", {
              position: toast.POSITION.TOP_CENTER
            }); 
          } else if (error.code === 'ERR_CANCELED') {
            console.log('connection canceled..')
            toast.error("Connection canceld..", {
              position: toast.POSITION.TOP_CENTER
            }); 
          }
          if (response) {
            //The request was made and the server responded with a status code that falls out of the range of 2xx the http status code mentioned above
            const statusCode = response?.status
            if (statusCode === 404) {
              console.log('The requested resource does not exist or has been deleted')
              toast.error("The requested resource does not exist or has been deleted", {
                position: toast.POSITION.TOP_CENTER
              });               
            } else if (statusCode === 400) {
              console.log('Request failed with status code 400');
              toast.info("Perhaps a user name with this name or email already exists try changing them", {
                position: toast.POSITION.TOP_CENTER
              }); 
            } else if (statusCode === 401) {
              console.log('Please login to access this resource')
              toast.error("Please login to access this resource", {
                position: toast.POSITION.TOP_CENTER
              }); 
              //redirect user to login
            } else if (statusCode === 500) {
              console.log('User not found')
              toast.warn("User not found", {
                position: toast.POSITION.TOP_CENTER
              }); 
            }
          } else if (request) {
            //The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
            console.log("Client never received a response, or request never left");
            toast.error("Client never received a response, or request never left", {
              position: toast.POSITION.TOP_CENTER
            }); 
          }
        }
        //Something happened in setting up the request and triggered an Error        
        console.log(error.message)        
      }
}