import { Button, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { useRef } from "react";
import { BiSearch } from "react-icons/bi";
import PlacesAutocomplete from "react-places-autocomplete";
import { AiOutlineClose } from 'react-icons/ai';
import { useEffect } from "react";
const searchOptions = {
    // input: 'Gorakhpur Uttar Pardesh',
    location: window.google?.maps?.LatLng(26.7606, 83.3732),
    types: ['address'],
    componentRestrictions: { country: "in" },
}


export const AddressAutocomplete = ({ handleSelect, address }) => {

    const [addressInput, setAddress] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        setAddress(address.user_full_address)
    }, [address])

    const selectAddress = (e) => {
        handleSelect(e);
        inputRef.current.blur();
    }

    return (
        <>
            <PlacesAutocomplete
                value={addressInput}
                onChange={address => setAddress(address)}
                onSelect={selectAddress}
                searchOptions={searchOptions}
            >

                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <InputGroup
                            margin={"auto"}
                            width={"94%"}
                        >
                            <InputLeftElement
                                pointerEvents='none'
                                children={<BiSearch color='#65b15c' />}
                            />
                            <Input
                                type="text"
                                border="1px solid #909090"
                                bg={"#fcfcfc"}
                                ref={inputRef}
                                // placeholder='Search for area, street'
                                {...getInputProps({
                                    placeholder: 'E.g. Taramandal , Golghar , Mohaddipur',
                                    className: 'form-control',
                                })}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={() => setAddress("")}>
                                    <AiOutlineClose />
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'list-group-item active'
                                    : 'list-group-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { cursor: 'pointer' }
                                    : { cursor: 'pointer' };
                                return (
                                    <div class="list-group"
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

            </PlacesAutocomplete>
        </>
    )
}