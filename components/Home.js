import React, {useState} from 'react';
import LineCard from './LineCard';

const Home = () => {
  const [lines, setLines] = useState([{}, {}, {}, {}]);

  const handleChangeDistance = (index, value) => {
    setLines((prev) => {
      const updated = [...prev];
      updated[index].distance = value;
      return updated;
    });
  };

  const handleChangeDescription = (index, value) => {
    setLines((prev) => {
      const updated = [...prev];
      updated[index].description = value;
      return updated;
    });
  };

  return lines.map((elt, index) => (
    <LineCard
      key={index}
      number={index + 1}
      distance={elt.distance}
      description={elt.description}
      onChangeDescription={(value) => handleChangeDescription(index, value)}
      onChangeDistance={(value) => handleChangeDistance(index, value)}
    />
  ));
};

export default Home;
