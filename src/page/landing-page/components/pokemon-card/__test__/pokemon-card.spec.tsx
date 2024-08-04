import { render, screen } from "@testing-library/react";
import {act} from 'react';
import { MemoryRouter } from "react-router-dom";
import PokemonCard from "../pokemon-card";
import { formatNumberWithLeadingZeros } from "../../../../../core/lib/utils";
import { routes } from "../../../../../core/constant/routes";
import { image_base_url } from "../../../../../core/constant/endpoints";

describe("PokemonCard component", () => {
  const props = {
    img_alt: "pikachu image",
    title: "Pikachu",
    item_index: 25,
  };

  it("renders the PokemonCard component", () => {
    act(() => {
      render(
        <MemoryRouter>
          <PokemonCard {...props} />
        </MemoryRouter>
      );
    });

    // Check if the image is rendered with the correct alt text
    const imgElement = screen.getByAltText("pikachu image");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", image_base_url("25"));

    // Check if the title is rendered correctly
    expect(screen.getByText("Pikachu")).toBeInTheDocument();

    // Check if the formatted item index is rendered correctly
    const formattedIndex = formatNumberWithLeadingZeros(props.item_index, 3);
    expect(screen.getByText(`(${formattedIndex})`)).toBeInTheDocument();
  });

  it("renders the correct link based on the item_index", () => {
    act(() => {
      render(
        <MemoryRouter>
          <PokemonCard {...props} />
        </MemoryRouter>
      );
    });

    // Check if the link element has the correct href attribute
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", routes.detail_page(props.item_index));
  });

  it("applies the correct classes for styling", () => {
    act(() => {
      render(
        <MemoryRouter>
          <PokemonCard {...props} />
        </MemoryRouter>
      );
    });

    // Check if the link element has the correct class
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveClass(
      "flex w-[150px] flex-col gap-3 bg-sky-gradient h-max p-6 rounded-xl shadow-sm cursor-pointer hover:scale-110 transition-all ease-in-out duration-150 hover:shadow-lg hover:brightness-90"
    );

    // Check if the img element has the correct class
    const imgElement = screen.getByAltText("pikachu image");
    expect(imgElement).toHaveClass("w-24");
  });
});
