import Card from "./Card";

const CardList = (props: any) => {
  const { cards } = props;
  return (
    <div className="grid grid-cols-3 gap-8">
      {cards.map((card: any) => (
        <Card
          key={card.title}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default CardList;
