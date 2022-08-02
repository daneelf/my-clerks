export const getUserCard = (user) => {
  //   console.log(user);
  return `<li class='slide'>
    <div class='card'>
      <picture class='card__image'>
        <source
          srcset='https://via.placeholder.com/150'
          media='(min-width: 75em)'
        />
        <source
          srcset='https://via.placeholder.com/150'
          media='(min-width: 40em)'
        />
        <img
          src='https://via.placeholder.com/150'
          alt='A description of the image.'
          width='100'
          height='100'
          loading='lazy'
          decoding='async'
        />
      </picture>
      <div>Darth Vader</div>
      <div>thisisamail@gmail.com</div>
      <div>69827273636</div>
      <div>Athens Greece</div>
    </div>
  </li>`;
};
