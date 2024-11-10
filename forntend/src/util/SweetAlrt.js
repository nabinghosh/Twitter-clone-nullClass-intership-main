import React from 'react'
import Swal from "sweetalert2"; 

export  const  SweetAlrt = (msg , status) =>{
   
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      // className: swal-wide,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    if(status == 'error'){
      Toast.fire({
        icon: 'error',
        title: `${msg}`
      })
    }else{
      Toast.fire({
        icon: 'success',
        title: `${msg}`
      })
    }

}
 

