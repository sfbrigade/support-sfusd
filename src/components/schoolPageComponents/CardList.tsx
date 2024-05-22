import Card from "./Card";

const CardList = (props: any) => {
  const { cards } = props;

  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {cards.map((card: any, i: number) => (
        <Card
          key={card.title}
          title={card.title}
          description={card.description}
          img={card.img}
          index={i}
        />
      ))}
    </div>
  );
};

export default CardList;
