import {Autocomplete, AutocompleteItem} from "@heroui/autocomplete";

export const animals = [
  {label: "Cat", key: "cat", description: "The second most popular pet in the world"},
  {label: "Dog", key: "dog", description: "The most popular pet in the world"},
  {label: "Elephant", key: "elephant", description: "The largest land animal"},
];

export const ThemeAutocomplete = ({
                                    labels= 'Items labels',
                                    placeholder= 'Search items',
                                  }) => {
  return (
    <>
      <Autocomplete
        inputProps={{
          style: { backgroundColor: "#ffffff" }, // Use inline style for background color
        }}
        key={'warning'}
        className="w-full bg-background"
        defaultItems={animals}
        label={labels}
        placeholder={placeholder}
      >
        {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
      </Autocomplete>
    </>
  )
}
