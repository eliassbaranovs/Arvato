import { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
} from "@material-tailwind/react";

export default function Example() {
  //Props
  const [open, setOpen] = useState(0);
  const { user } = useSelector((state) => state.auth);
  // Handle open event
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };

  return (
    <>
      {user && <Header user={user} />}
      <div className="mb-10">
        <Typography variant="h2" className="mx-auto text-center" color="blue">
          Favorite Questions
        </Typography>
        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Find out more about Access Check App
        </p>
      </div>
      <div className="w-3/4 mx-auto">
        <Fragment>
          <Accordion open={open === 1} animate={customAnimation}>
            <AccordionHeader onClick={() => handleOpen(1)}>
              What is Access Check App?
            </AccordionHeader>
            <AccordionBody>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              velit reprehenderit, a maxime fugiat tenetur culpa, itaque quae at
              tempore omnis qui perferendis nihil sapiente maiores tempora
              accusantium accusamus error?
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 2} animate={customAnimation}>
            <AccordionHeader onClick={() => handleOpen(2)}>
              What is Access Check App?
            </AccordionHeader>
            <AccordionBody>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
              magni! Delectus, eum, repellendus obcaecati perferendis odio at
              itaque autem est, ab vitae libero et. Id recusandae fuga totam
              odit ducimus!
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 3} animate={customAnimation}>
            <AccordionHeader onClick={() => handleOpen(3)}>
              What is Access Check App?
            </AccordionHeader>
            <AccordionBody>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              ut est voluptatem, sunt cupiditate hic officiis inventore quod
              quis officia similique delectus dicta asperiores quo accusamus
              illo nisi in doloribus!
            </AccordionBody>
          </Accordion>
        </Fragment>
      </div>
    </>
  );
}
