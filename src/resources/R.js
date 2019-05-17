// This file imports all resource reference holders , allowing components to access all resources
// by importing just this file instead of importing every single one of them
// example usage :
// {R.strings.hello} or {R.images.intro_img}

import strings from './Strings';
import colors from './Colors';
import images from './Images';
import animations from './Animations';


const R = {
  strings,
  colors,
  images,
  animations,
};

export default R;
