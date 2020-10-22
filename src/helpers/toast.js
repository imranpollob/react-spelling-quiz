import { toast } from "react-toastify";

const options = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export function defaultToast(text) {
  toast(text, options);
}

export function infoToast(text) {
  toast.info(text, options);
}

export function successToast(text) {
  toast.success(text, options);
}

export function warningToast(text) {
  toast.warn(text, options);
}

export function dangerToast(text) {
  toast.error(text, options);
}

export function darkToast(text) {
  toast.dark(text, options);
}
