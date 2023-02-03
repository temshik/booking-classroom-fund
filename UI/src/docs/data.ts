export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly usedBuildings: string[];
  }
  
  export const colourOptions: readonly ColourOption[] = [
    { value: 'ATF', label: 'Automotive and Tractor Faculty', usedBuildings: ['1','2','3']},
    { value: 'FMEE', label: 'The Faculty of Mining and Engineering Ecology', usedBuildings: ['1','2','3']},
    { value: 'MSF', label: 'Faculty of Mechanical Engineering', usedBuildings: ['1','2','3']},
    { value: 'MTF', label: 'The Faculty of Mechanics and Technology', usedBuildings: ['1','2','3']},
    { value: 'FMME', label: 'The Faculty of Marketing, Management, Entrepreneurship', usedBuildings: ['1','2','3']},
    { value: 'FE', label: 'The Faculty of Energy', usedBuildings: ['1','2','3']},
    { value: 'FITR', label: 'Faculty of Information Technology and Robotics', usedBuildings: ['1','2','3']},
    { value: 'FMTH', label: 'Faculty of Management Technologies and Humanization', usedBuildings: ['1','2','3']},
    { value: 'FEE', label: 'Faculty of Engineering and Education', usedBuildings: ['1','2','3']},
    { value: 'FEC', label: 'Faculty of Energy Construction', usedBuildings: ['1','2','3']},
    { value: 'AF', label: 'Architecture faculty', usedBuildings: ['1','2','3']},
    { value: 'FCE', label: 'Faculty of Civil Engineering', usedBuildings: ['1','2','3']},
    { value: 'FI', label: 'Faculty of Instrumentation', usedBuildings: ['1','2','3']},
    { value: 'FTC', label: 'Faculty of Transport Communications', usedBuildings: ['1','2','3']},
    { value: 'MTF', label: 'Military Technical Faculty', usedBuildings: ['1','2','3']},
    { value: 'STF', label: 'Sports and technical faculty', usedBuildings: ['1','2','3']},
    { value: 'Branch Soligorsk', label: 'Branch Soligorsk', usedBuildings: ['1','2','3']},
    { value: 'FET BNTU-TTU', label: 'Joint Faculty of Engineering and Technology BNTU-TTU', usedBuildings: ['1','2','3']},
    { value: 'FIC', label: 'Faculty of International Cooperation', usedBuildings: ['1','2','3']},
    { value: 'BNTU-TSTU', label: 'Joint faculty of BNTU-TSTU', usedBuildings: ['1','2','3']},
  ];

export interface BuildingOption{
  readonly value: string;
}

  export const buildingOptions: readonly BuildingOption[] = [
    { value: '1'},
    { value: '2'},
    { value: '3'},
    { value: '4'},
    { value: '6'},
    { value: '7'},
    { value: '8'},
    { value: '9'},
    { value: '11"А"'},
    { value: '11"Б"'},
    { value: '12'},
    { value: '15'},
    { value: '17'},
    { value: '18'},
    { value: '20'},    
  ];
  
  