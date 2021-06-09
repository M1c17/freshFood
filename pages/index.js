import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home({ results }) {
  console.log(results);

  return (
    <div>
      <h1>Macros</h1>

      {results &&
        results.foods.map((food) => (
          <div>
            <h2 key={food.fdcId}>
              {food.brandName != null ? food.brandName : food.brandOwner}
            </h2>
            <ul>
              {food.foodNutrients
                .filter(
                  (nutrient) =>
                    nutrient.nutrientId === 1003 ||
                    nutrient.nutrientId === 1005 ||
                    nutrient.nutrientId === 1004
                )
                .map((nutrient) => (
                  <li key={nutrient.nutrientId}>
                    {' '}
                    {nutrient.nutrientName}: {nutrient.value}g{' '}
                  </li>
                ))}
            </ul>
          </div>
        ))}
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const res = await fetch(
    `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query.term}&api_key=${process.env.APIKEY}`
  );

  const data = await res.json();
  console.log(data);

  // console.log(res);

  return {
    props: {
      results: data,
    },
  };
}
