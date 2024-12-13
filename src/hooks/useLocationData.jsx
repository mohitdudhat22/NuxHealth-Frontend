import { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";

export const useLocationData = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    const loadCountries = () => {
      const allCountries = Country.getAllCountries().map((country) => ({
        value: country.isoCode,
        label: country.name,
      }));
      setCountries(allCountries);
    };

    loadCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const loadStates = () => {
        const statesList = State.getStatesOfCountry(selectedCountry).map(
          (state) => ({
            value: state.isoCode,
            label: state.name,
          }),
        );
        setStates(statesList);
      };

      loadStates();
    } else {
      setStates([]);
    }
    setCities([]); // Reset cities if country changes
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const loadCities = () => {
        const citiesList = City.getCitiesOfState(
          selectedCountry,
          selectedState,
        ).map((city) => ({
          value: city.name,
          label: city.name,
        }));
        setCities(citiesList);
      };

      loadCities();
    } else {
      setCities([]);
    }
  }, [selectedState, selectedCountry]);

  return {
    countries,
    states,
    cities,
    setSelectedCountry,
    setSelectedState,
  };
};
