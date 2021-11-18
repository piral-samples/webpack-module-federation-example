import * as React from "react";
import dummyImage from "./sample.jpg";

const Page: React.FC = () => {
  return (
    <>
      <h1>Sample Page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa atque
        possimus, voluptatum at nostrum voluptatem quos ex distinctio quasi.
        Delectus odio quis aut magni quas iure voluptate consectetur deserunt
        asperiores.
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae eveniet
        esse nemo ratione nesciunt nobis facere culpa. Eum, voluptas nisi harum
        esse aliquid provident blanditiis fuga quaerat pariatur accusamus
        voluptatibus?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem aperiam
        nihil nostrum ea eaque eius obcaecati consequuntur quae quasi optio
        fugit exercitationem perferendis dolorem vero debitis, ut quod itaque.
        Hic?
      </p>
      <figure>
        <img src={dummyImage} />
        <figcaption>
          Photo by{" "}
          <a href="https://unsplash.com/@reneporter?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            René Porter
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/s/photos/sample?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </figcaption>
      </figure>
    </>
  );
};

export default Page;
