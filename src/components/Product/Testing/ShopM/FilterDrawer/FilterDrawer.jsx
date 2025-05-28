import React, { useState, useEffect } from 'react';
import { useProducts } from '../Context/ProductContext';
import { categories } from '../../../../../data/mockData';
import { Checkbox } from "../../../../../ui/checkbox/checkbox";
import { Label } from "../../../../../ui/Label/Label";
import { RadioGroup, RadioGroupItem } from "../../../../../ui/radio-group";
import { Button } from '../../../../../ui/Button';
import { X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "../../../../../ui/sheet";

import './FilterDrawer.css';


const FilterDrawer = ({ open, onClose }) => {
  const { filterOptions, updateFilterOptions } = useProducts();
  
  // Default values in case filterOptions is undefined
  const defaultPriceRange = [0, 2000];
  const defaultCategories = [];
  const defaultInStock = false;
  
  // Safely access filterOptions with fallbacks
  const priceRange = filterOptions?.priceRange || defaultPriceRange;
  const selectedCategories = filterOptions?.categories || defaultCategories;
  const inStock = filterOptions?.inStock || defaultInStock;
  
  const [minPrice, setMinPrice] = useState(priceRange[0].toString());
  const [maxPrice, setMaxPrice] = useState(priceRange[1].toString());
  const [location, setLocation] = useState('anywhere');
  const [customLocation, setCustomLocation] = useState('');
  const [itemFormat, setItemFormat] = useState('all');
  const [readyToDispatch, setReadyToDispatch] = useState([]);
  const [colors, setColors] = useState([]);
  const [itemType, setItemType] = useState('all');
  const [orderingOptions, setOrderingOptions] = useState([]);
  
  // Update local state when filterOptions changes
  useEffect(() => {
    if (filterOptions) {
      setMinPrice(filterOptions.priceRange[0].toString());
      setMaxPrice(filterOptions.priceRange[1].toString());
    }
  }, [filterOptions]);

 useEffect(() => {
  if (updateFilterOptions) {
    updateFilterOptions({
      priceRange: [parseInt(minPrice) || 0, parseInt(maxPrice) || 2000],
      categories: selectedCategories,
      inStock,
    });
  }
}, [minPrice, maxPrice, selectedCategories, inStock, updateFilterOptions]); // updateFilterOptions now stable

  // Handle category selection
  const handleCategoryChange = (category, checked) => {
    const newCategories = checked 
      ? [...selectedCategories, category]
      : selectedCategories.filter(c => c !== category);
        
    if (updateFilterOptions) {
      updateFilterOptions({ categories: newCategories });
    }
  };

  // Handle price range input change
  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  // Handle checkbox arrays
  const handleArrayToggle = (array, setter, value) => {
    if (array.includes(value)) {
      setter(array.filter(item => item !== value));
    } else {
      setter([...array, value]);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setMinPrice('0');
    setMaxPrice('2000');
    setInStock(defaultInStock);
    setLocation('anywhere');
    setCustomLocation('');
    setItemFormat('all');
    setReadyToDispatch([]);
    setColors([]);
    setItemType('all');
    setOrderingOptions([]);
        
    if (updateFilterOptions) {
      updateFilterOptions({
        inStock: false,
        priceRange: [0, 2000],
        categories: [],
        subcategories: [],
      });
    }
  };

  // Apply filters and close drawer
  const applyFilters = () => {
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent 
        side="left" 
        className={`filter-drawer-content ${open ? 'filter-drawer-open' : ''}`}
      >
        <div className="filter-drawer-container">
          <SheetHeader className="filter-drawer-header">
            <div className="filter-drawer-title-container">
              
             
            </div>
          </SheetHeader>
                  
          <div className="filter-drawer-scrollable-content">
            {/* Filter by category */}
            <div className="filter-section">
              <h3 className="filter-section-title">Filter by category</h3>
              <div className="filter-options">
                {categories.slice(0, 3).map(category => (
                  <div key={category.id} className="filter-option">
                    <Checkbox 
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.name)}
                      onCheckedChange={(checked) => handleCategoryChange(category.name, checked)}
                    />
                    <Label htmlFor={`category-${category.id}`} className="filter-option-label">{category.name}</Label>
                  </div>
                ))}
              </div>
              <button className="show-more-btn">
                Show more
              </button>
            </div>

            {/* Special offers */}
            <div className="filter-section">
              <h3 className="filter-section-title">Special offers</h3>
              <div className="filter-options">
                <div className="filter-option">
                  <Checkbox 
                    id="free-delivery"
                    checked={orderingOptions.includes('free-delivery')}
                    onCheckedChange={(checked) => handleArrayToggle(orderingOptions, setOrderingOptions, 'free-delivery')}
                  />
                  <Label htmlFor="free-delivery" className="filter-option-label">FREE delivery</Label>
                </div>
                <div className="filter-option">
                  <Checkbox 
                    id="on-sale"
                    checked={orderingOptions.includes('on-sale')}
                    onCheckedChange={(checked) => handleArrayToggle(orderingOptions, setOrderingOptions, 'on-sale')}
                  />
                  <Label htmlFor="on-sale" className="filter-option-label">On sale</Label>
                </div>
              </div>
            </div>

            {/* Shop Location */}
            <div className="filter-section">
              <h3 className="filter-section-title">Shop Location</h3>
              <RadioGroup value={location} onValueChange={setLocation} className="radio-group">
                <div className="filter-option">
                  <RadioGroupItem value="anywhere" id="anywhere" />
                  <Label htmlFor="anywhere" className="filter-option-label">Anywhere</Label>
                </div>
                <div className="filter-option">
                  <RadioGroupItem value="india" id="india" />
                  <Label htmlFor="india" className="filter-option-label">India</Label>
                </div>
                <div className="filter-option">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom" className="filter-option-label">Custom</Label>
                </div>
                {location === 'custom' && (
                  <input
                    type="text"
                    value={customLocation}
                    onChange={(e) => setCustomLocation(e.target.value)}
                    placeholder="Enter location"
                    className="custom-location-input"
                  />
                )}
              </RadioGroup>
            </div>

            {/* Item format */}
            <div className="filter-section">
              <h3 className="filter-section-title">Item format</h3>
              <RadioGroup value={itemFormat} onValueChange={setItemFormat} className="radio-group">
                <div className="filter-option">
                  <RadioGroupItem value="all" id="format-all" />
                  <Label htmlFor="format-all" className="filter-option-label">All</Label>
                </div>
                <div className="filter-option">
                  <RadioGroupItem value="physical" id="physical-items" />
                  <Label htmlFor="physical-items" className="filter-option-label">Physical items</Label>
                </div>
                <div className="filter-option">
                  <RadioGroupItem value="digital" id="digital-downloads" />
                  <Label htmlFor="digital-downloads" className="filter-option-label">Digital downloads</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Ready to dispatch in */}
            <div className="filter-section">
              <h3 className="filter-section-title">Ready to dispatch in</h3>
              <div className="filter-options">
                <div className="filter-option">
                  <Checkbox 
                    id="dispatch-1day"
                    checked={readyToDispatch.includes('1day')}
                    onCheckedChange={(checked) => handleArrayToggle(readyToDispatch, setReadyToDispatch, '1day')}
                  />
                  <Label htmlFor="dispatch-1day" className="filter-option-label">1 day</Label>
                </div>
                <div className="filter-option">
                  <Checkbox 
                    id="dispatch-1-3days"
                    checked={readyToDispatch.includes('1-3days')}
                    onCheckedChange={(checked) => handleArrayToggle(readyToDispatch, setReadyToDispatch, '1-3days')}
                  />
                  <Label htmlFor="dispatch-1-3days" className="filter-option-label">1-3 days</Label>
                </div>
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="filter-section">
              <h3 className="filter-section-title">Price (₹)</h3>
              <RadioGroup value="custom" className="radio-group price-radio-group">
                <div className="filter-option">
                  <RadioGroupItem value="any" id="any-price" />
                  <Label htmlFor="any-price" className="filter-option-label">Any price</Label>
                </div>
                <div className="filter-option">
                  <RadioGroupItem value="custom" id="custom-price" />
                  <Label htmlFor="custom-price" className="filter-option-label">Custom</Label>
                </div>
              </RadioGroup>
              <div className="price-range-inputs">
                <input
                  type="text"
                  id="min-price"
                  placeholder="Low"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  className="price-input"
                />
                <span className="price-range-separator">to</span>
                <input
                  type="text"
                  id="max-price"
                  placeholder="High"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  className="price-input"
                />
              </div>
            </div>

            {/* Color */}
            <div className="filter-section">
              <h3 className="filter-section-title">Colour</h3>
              <div className="filter-options">
                <div className="filter-option">
                  <Checkbox 
                    id="color-beige"
                    checked={colors.includes('beige')}
                    onCheckedChange={(checked) => handleArrayToggle(colors, setColors, 'beige')}
                  />
                  <Label htmlFor="color-beige" className="filter-option-label">Beige</Label>
                </div>
                <div className="filter-option">
                  <Checkbox 
                    id="color-black"
                    checked={colors.includes('black')}
                    onCheckedChange={(checked) => handleArrayToggle(colors, setColors, 'black')}
                  />
                  <Label htmlFor="color-black" className="filter-option-label">Black</Label>
                </div>
                <div className="filter-option">
                  <Checkbox 
                    id="color-blue"
                    checked={colors.includes('blue')}
                    onCheckedChange={(checked) => handleArrayToggle(colors, setColors, 'blue')}
                  />
                  <Label htmlFor="color-blue" className="filter-option-label">Blue</Label>
                </div>
              </div>
              <button className="show-more-btn">
                Show more
              </button>
            </div>

            {/* Item type */}
            <div className="filter-section">
              <h3 className="filter-section-title">Item type</h3>
              <RadioGroup value={itemType} onValueChange={setItemType} className="radio-group">
                <div className="filter-option">
                  <RadioGroupItem value="all" id="type-all" />
                  <Label htmlFor="type-all" className="filter-option-label">All items</Label>
                </div>
                <div className="filter-option">
                  <RadioGroupItem value="vintage" id="type-vintage" />
                  <Label htmlFor="type-vintage" className="filter-option-label">Vintage</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Ordering options */}
            <div className="filter-section">
              <h3 className="filter-section-title">Ordering options</h3>
              <div className="filter-options">
                <div className="filter-option">
                  <Checkbox 
                    id="accepts-gift-cards"
                    checked={orderingOptions.includes('gift-cards')}
                    onCheckedChange={(checked) => handleArrayToggle(orderingOptions, setOrderingOptions, 'gift-cards')}
                  />
                  <Label htmlFor="accepts-gift-cards" className="filter-option-label"> Gift cards</Label>
                </div>
                <div className="filter-option">
                  <Checkbox 
                    id="can-be-gift-wrapped"
                    checked={orderingOptions.includes('gift-wrapped')}
                    onCheckedChange={(checked) => handleArrayToggle(orderingOptions, setOrderingOptions, 'gift-wrapped')}
                  />
                  <Label htmlFor="can-be-gift-wrapped" className="filter-option-label">Can be gift-wrapped</Label>
                </div>
                <div className="filter-option">
                  <Checkbox 
                    id="customizable"
                    checked={orderingOptions.includes('customizable')}
                    onCheckedChange={(checked) => handleArrayToggle(orderingOptions, setOrderingOptions, 'customizable')}
                  />
                  <Label htmlFor="customizable" className="filter-option-label">Customizable</Label>
                </div>
              </div>
            </div>

            {/* Deliver to */}
            <div className="filter-section">
              <h3 className="filter-section-title">Deliver to</h3>
              <select className="deliver-to-select">
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
          </div>
                  
          <SheetFooter className="filter-drawer-footer">
            <div className="filter-action-buttons">
              <Button size="sm" variant="outline" className="reset-btn" onClick={resetFilters}>
                Reset
              </Button>
              <Button className="apply-btn" onClick={applyFilters}>
                Apply
              </Button>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterDrawer;