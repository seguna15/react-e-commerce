export const imagesValidator = (images) => {
    let newErrs = [];
    
    if(images.length > 0){
      images.forEach((file) => {
        if (file?.size > 1000000) {
          
          newErrs.push(`${file?.name} is too large`);
        }

        if (!file?.type?.startsWith("image/")) {
          newErrs.push(`${file?.name} is not an image`);
        }
      });
    }else{
      if (images?.size > 1000000) {
          newErrs.push(`${images?.name} is too large`);
        }

        if (!images?.type?.startsWith("image/")) {
          newErrs.push(`${images?.name} is not an image`);
        }
    }
    
   
    return newErrs
}