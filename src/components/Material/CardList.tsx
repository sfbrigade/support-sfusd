import Card from "./Card";

const CardList = (props: any) => {
  const { cards } = props;
  return (
    <div className="grid 2xl:grid-cols-10 lg:grid-cols-6 sm:grid-cols-4 gap-8">
      {cards.map((card: any) => (
        <Card title={card.title} description={card.description} />
      ))}
    </div>
  );
};

export default CardList;
