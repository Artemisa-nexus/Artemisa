// Toast notification helpers using SweetAlert2
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    // Pause timer on mouse hover
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

// Show success notification
export function alertSuccess(message){
    Toast.fire({
  icon: "success",
  title: message
});
}

// Show error notification
export function alertError(message){
    Toast.fire({
    icon: "error",
    title: message
    });
}