import router from '../../router/index';

export default function(to){
  const navigateTo = () => {
   router.push({
       name: to
   })
  };
  return {navigateTo};
}
