import { FilterArray } from "lib/utils/ArtworkFiltersStore"
import { forOwn, omit } from "lodash"

const defaultFilterParams = {
  sort: "-decayed_merch",
  medium: "*",
  priceRange: "",
  dimensionRange: "*-*",
  color: "*-*",
  majorPeriods: [],
  atAuction: false,
  acquireable: false,
  inquireableOnly: false,
  offerable: false,
} as FilterParams

const applyFilters = (appliedFilters: FilterArray, filterParams: FilterParams) => {
  appliedFilters.forEach(appliedFilterOption => {
    const paramMapping = filterTypeToParam[appliedFilterOption.filterType]
    const paramValue =
      paramMapping[appliedFilterOption.value as SortOption | MediumOption | PriceRangeOption | TimePeriodOption]

    if (appliedFilterOption.value === true) {
      const mapToRelayParam = paramMapping[appliedFilterOption.filterType]
      filterParams[mapToRelayParam as MultiOptionRelayParams] = true
    } else {
      filterParams[appliedFilterOption.filterType as SingleOptionRelayParams] = paramValue
    }
  })

  return filterParams
}

export const filterArtworksParams = (appliedFilters: FilterArray) => {
  return applyFilters(appliedFilters, { ...defaultFilterParams })
}

const getChangedParams = (appliedFilters: FilterArray) => {
  const filterParams = applyFilters(appliedFilters, {})

  // when filters cleared return default params
  return Object.keys(filterParams).length === 0 ? defaultFilterParams : filterParams
}

export const changedFiltersParams = (
  currentFilterParams: any /* STRICTNESS_MIGRATION */,
  selectedFilterOptions: FilterArray
) => {
  const selectedFilterParams = getChangedParams(selectedFilterOptions)
  const changedFilters = {}

  /** If a filter option has been updated e.g. was { medium: "photography" } but
   *  is now { medium: "sculpture" } add the updated filter to changedFilters. Otherwise,
   *  add filter option to changedFilters.
   */
  forOwn(getChangedParams(selectedFilterOptions), (_value, filterType) => {
    // @ts-ignore STRICTNESS_MIGRATION
    if (currentFilterParams[filterType] === selectedFilterParams[filterType]) {
      const omitted = omit(selectedFilterParams, [filterType])
      // @ts-ignore STRICTNESS_MIGRATION
      if (omitted[filterType]) {
        // @ts-ignore STRICTNESS_MIGRATION
        changedFilters[filterType] = omitted[filterType]
      }
    } else {
      // @ts-ignore STRICTNESS_MIGRATION
      changedFilters[filterType] = selectedFilterParams[filterType]
    }
  })

  return changedFilters
}

// Sorting types
enum ArtworkSorts {
  "Default" = "-decayed_merch",
  "Price (high to low)" = "sold,-has_price,-prices",
  "Price (low to high)" = "sold,-has_price,prices",
  "Recently updated" = "-partner_updated_at",
  "Recently added" = "-published_at",
  "Artwork year (descending)" = "-year",
  "Artwork year (ascending)" = "year",
}

export type SortOption = keyof typeof ArtworkSorts

export const OrderedArtworkSorts: SortOption[] = [
  "Default",
  "Price (low to high)",
  "Price (high to low)",
  "Recently updated",
  "Recently added",
  "Artwork year (descending)",
  "Artwork year (ascending)",
]

// Medium filter types
enum MediumFilters {
  "All" = "*",
  "Painting" = "painting",
  "Photography" = "photography",
  "Sculpture" = "sculpture",
  "Prints & multiples" = "prints",
  "Works on paper" = "work-on-paper",
  "Film & video" = "film-slash-video",
  "Design" = "design",
  "Jewelry" = "jewelry",
  "Drawing" = "drawing",
  "Installation" = "installation",
  "Performance art" = "performance-art",
}

export const OrderedMediumFilters: MediumOption[] = [
  "All",
  "Painting",
  "Photography",
  "Sculpture",
  "Prints & multiples",
  "Works on paper",
  "Design",
  "Drawing",
  "Installation",
  "Film & video",
  "Jewelry",
  "Performance art",
]

export type MediumOption = keyof typeof MediumFilters

// Price Range types
enum PriceRangeFilters {
  "All" = "",
  "$0-5,000" = "*-5000",
  "$5,000-10,000" = "5000-10000",
  "$10,000-20,000" = "10000-20000",
  "$20,000-40,000" = "20000-40000",
  "$50,000+" = "50000-*",
}

export type PriceRangeOption = keyof typeof PriceRangeFilters

export const OrderedPriceRangeFilters: PriceRangeOption[] = [
  "All",
  "$50,000+",
  "$20,000-40,000",
  "$10,000-20,000",
  "$5,000-10,000",
  "$0-5,000",
]

// Size Types
enum SizeFilters {
  "All" = "*-*",
  'Small (0"-40")' = "*-40",
  'Medium (40"-70")' = "40-70",
  'Large (70"+")' = "70-*",
}

export type SizeOption = keyof typeof SizeFilters

export const OrderedSizeFilters: SizeOption[] = ["All", 'Small (0"-40")', 'Medium (40"-70")', 'Large (70"+")']

// Color types

enum ColorFilters {
  "orange" = "orange",
  "darkblue" = "darkblue",
  "gold" = "gold",
  "darkgreen" = "darkgreen",
  "lightblue" = "lightblue",
  "lightgreen" = "lightgreen",
  "yellow" = "yellow",
  "darkorange" = "darkorange",
  "red" = "red",
  "pink" = "pink",
  "darkviolet" = "darkviolet",
  "violet" = "violet",
  "black-and-white" = "black-and-white",
}

export type ColorOption = keyof typeof ColorFilters

export const OrderedColorFilters: ColorOption[] = [
  "black-and-white",
  "lightgreen",
  "darkgreen",
  "lightblue",
  "darkblue",
  "violet",
  "darkviolet",
  "black-and-white",
  "yellow",
  "gold",
  "orange",
  "darkorange",
  "red",
  "pink",
]

// Time Period types
enum TimePeriodFilters {
  "All" = "",
  "2010-today" = "2010",
  "2000-2009" = "2000",
  "1990-1999" = "1990",
  "1980-1989" = "1980",
  "1970-1979" = "1970",
  "1960-1969" = "1960",
  "1950-1959" = "1950",
  "1940-1949" = "1940",
  "1930-1939" = "1930",
  "1920-1929" = "1920",
  "1910-1919" = "1910",
  "1900-1909" = "1900",
  "Late 19th century" = "Late 19th Century",
  "Mid 19th century" = "Mid 19th Century",
  "Early 19th century" = "Early 19th Century",
}

export const mapTimePeriodTypesToFilterTypes = {
  All: [],
  "2010-today": "2010",
  "2000-2009": "2000",
  "1990-1999": "1990",
  "1980-1989": "1980",
  "1970-1979": "1970",
  "1960-1969": "1960",
  "1950-1959": "1950",
  "1940-1949": "1940",
  "1930-1939": "1930",
  "1920-1929": "1920",
  "1910-1919": "1910",
  "1900-1909": "1900",
  "Late 19th century": "Late 19th Century",
  "Mid 19th century": "Mid 19th Century",
  "Early 19th century": "Early 19th Century",
}

export type TimePeriodOption = keyof typeof TimePeriodFilters

export const OrderedTimePeriodFilters: TimePeriodOption[] = [
  "All",
  "2010-today",
  "2000-2009",
  "1990-1999",
  "1980-1989",
  "1970-1979",
  "1960-1969",
  "1950-1959",
  "1940-1949",
  "1930-1939",
  "1920-1929",
  "1910-1919",
  "1900-1909",
  "Late 19th century",
  "Mid 19th century",
  "Early 19th century",
]

// Ways to Buy types
enum WaysToBuyFilters {
  "Buy now" = "acquireable",
  "Make offer" = "offerable",
  "Bid" = "atAuction",
  "Inquire" = "inquireableOnly",
}

export const mapWaysToBuyTypesToFilterTypes = {
  "Buy now": "waysToBuyBuy",
  Bid: "waysToBuyBid",
  Inquire: "waysToBuyInquire",
  "Make offer": "waysToBuyMakeOffer",
}

export const WaysToBuyDefaultValues = {
  acquireable: { filterType: "waysToBuyBuy", value: false },
  inquireableOnly: { filterType: "waysToBuyInquire", value: false },
  offerable: { filterType: "waysToBuyMakeOffer", value: false },
  atAuction: { filterType: "waysToBuyBid", value: false },
}

export type WaysToBuyOptions = keyof typeof WaysToBuyFilters

export const OrderedWaysToBuyFilters: WaysToBuyOptions[] = ["Buy now", "Make offer", "Bid", "Inquire"]

// General filter types and objects
interface FilterTypes {
  sort: any
  medium: any
  priceRange: any
  dimensionRange: any
  color: any
  majorPeriods: any
  waysToBuyBuy: any
  waysToBuyBid: any
  waysToBuyInquire: any
  waysToBuyMakeOffer: any
}

export type FilterOption = keyof FilterTypes

// TODO: Refactor applyFilters function so the waysToBuy types needn't be nested
const filterTypeToParam: FilterTypes = {
  sort: ArtworkSorts,
  medium: MediumFilters,
  priceRange: PriceRangeFilters,
  dimensionRange: SizeFilters,
  color: ColorFilters,
  majorPeriods: mapTimePeriodTypesToFilterTypes,
  waysToBuyBuy: { waysToBuyBuy: "acquireable" },
  waysToBuyBid: { waysToBuyBid: "atAuction" },
  waysToBuyInquire: {
    waysToBuyInquire: "inquireableOnly",
  },
  waysToBuyMakeOffer: { waysToBuyMakeOffer: "offerable" },
}

// Types for the parameters passed to Relay
type MultiOptionRelayParams = "acquireable" | "inquireableOnly" | "atAuction" | "offerable"

type SingleOptionRelayParams = "sort" | "medium" | "priceRange" | "majorPeriod"

interface FilterParams {
  sort?:
    | "-decayed_merch"
    | "sold,-has_price,-prices"
    | "sold,-has_price,prices"
    | "-partner_updated_at"
    | "-published_at"
    | "-year"
    | "year"
  medium?:
    | "*"
    | "painting"
    | "photography"
    | "sculpture"
    | "prints"
    | "work-on-paper"
    | "film-slash-video"
    | "design"
    | "jewelry"
    | "drawing"
    | "installation"
    | "performance-art"
  priceRange?: "" | "*-5000" | "5000-10000" | "10000-20000" | "20000-40000" | "50000-*"
  dimensionRange?: "*-*" | "*-40" | "40-70" | "70-*"
  color?: "*-*" | "*-40" | "40-70" | "70-*"
  majorPeriod?:
    | []
    | "2010"
    | "2000"
    | "1990"
    | "1980"
    | "1970"
    | "1960"
    | "1950"
    | "1940"
    | "1930"
    | "1920"
    | "1910"
    | "1900"
    | "Late 19th Century"
    | "Mid 19th Century"
    | "Early 19th Century"
  acquireable?: boolean
  inquireableOnly?: boolean
  atAuction?: boolean
  offerable?: boolean
}

export interface InitialState {
  initialState: {
    selectedFilters: FilterArray
    appliedFilters: FilterArray
    previouslyAppliedFilters: FilterArray
    applyFilters: boolean
  }
}
