export const getUserCard = (user) => {
  const {
    name: { first, last, title },
    phone,
    email,
    picture: { large, medium, thumbnail },
    location: { country, city },
  } = user;

  return `<li class='slide'>
    <div class='card'>
      <picture class='card__image'>
      <source
      srcset=${medium}
      media='(min-width: 40em)'
    />
        <source
          srcset=${large}
          media='(min-width: 75em)'
        />
        <img
          src=${thumbnail}
          alt='A description of the image.'
          width='72'
          height='72'
          loading='lazy'
          decoding='async'
        />
      </picture>
      <div class="card__name">${title} ${first} ${last}</div>

      <div class="card__info">
        <div>${email}</div>
        <div>${phone}</div>
      <div>${city}, ${country}</div>
      </div>
    </div>
  </li>`;
};
