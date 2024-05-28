import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Toast.css'

const ToastProps = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
};

const customToastOptionError = {
    className: 'customToastOptionError',
    bodyClassName: 'text-sm',
};

const customToastOptionSuccess = {
    className: 'customToastOptionSuccess',
    bodyClassName: 'text-sm',
};

const customToastOptionInfo = {
    className: 'customToastOptionInfo',
    bodyClassName: 'text-sm',
};

export const showSuccessToast = (message, options) => {
    toast.success(message, { ...customToastOptionSuccess, ...options });
};

export const showErrorToast = (message, options) => {
    toast.error(message, { ...customToastOptionError, ...options });
};

export const showInfoToast = (message, options) => {
    toast.info(message, { ...customToastOptionInfo, ...options });
};

export default ToastProps;
