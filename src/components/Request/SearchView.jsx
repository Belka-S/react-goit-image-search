import { Div } from './All.styled';

export const SearchView = ({ fetchedData: { name, sprites, stats } }) => (
  <Div>
    {name && <h3>{name}</h3>}
    {stats[0] && (
      <ul>
        {stats.map(el => (
          <li key={el.stat.name}>
            {el.stat.name}: {el.base_stat}
          </li>
        ))}
      </ul>
    )}
    <img
      src={sprites.other['official-artwork'].front_default}
      alt={name}
      width="100"
      height="100"
    />
  </Div>
);
