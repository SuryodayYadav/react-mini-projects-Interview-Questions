const Accordian = ({open}) => {
  return (
    <div>
      <details open={true}>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem
          impedit eveniet minima veniam ullam iusto dolores quos aliquid
          voluptate? Voluptas, omnis. Suscipit harum commodi voluptas molestiae
          quas facere dolorem odio!
        </p>
        <ul>
          unordered list
          <li>1 no order list</li>
          <li>2 no order list</li>
        </ul>
      </details>
      <details>
        <summary>
          Can I ask you a qns?
        </summary>
        <p>Yes. You can ask me</p>
      </details>
    </div>
  );
};
export default Accordian;
