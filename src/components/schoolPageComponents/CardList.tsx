import Card from "./Card";

const CardList = (props: any) => {
  const { cards } = props;
  return (
    <div className="grid gap-8 sm:grid-cols-3">
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
