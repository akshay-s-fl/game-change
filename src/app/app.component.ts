import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetdataService } from './services/getdata.service';

// import myData from '../assets/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gameChange';
  registerForm: FormGroup;
  submitted = false;
  skillArray = [];
  skillsData;
  showSkillArray = false;
  totalDamange = 0;

  // Constant Data for Combat Attributes.
  TENANCITY_ADDITION_FACTOR = 1;
  VITALITY_ADDITION_FACTOR = 3;
  EVASION_ADDITION_FACTOR = 10;

  // Constant for value
  UNTRAINED_RANK_VALUE = 0;
  NOVICE_RANK_VALUE = 1;
  APPRENTICE_RANK_VALUE = 2;
  ADEPT_RANK_VALUE = 3;
  EXPERT_RANK_VALUE = 4;
  MASTER_RANK_VALUE = 5;

  // Constant for NOVICE range
  LOWER_NOVICE_RANK_BOUND = 1;
  UPER_NOVICE_RANK_BOUND = 20;

  // Constant for APPRENTICE range
  LOWER_APPRENTICE_RANK_BOUND = 21;
  UPER_APPRENTICE_RANK_BOUND = 40;

  // Constant for ADEPT range
  LOWER_ADEPT_RANK_BOUND = 41;
  UPER_ADEPT_RANK_BOUND = 60;

  // Constant for EXPERT range
  LOWER_EXPERT_RANK_BOUND = 61;
  UPER_EXPERT_RANK_BOUND = 80;

  // Constant for EXPERT range
  LOWER_MASTER_RANK_BOUND = 81;
  UPER_MASTER_RANK_BOUND = 100;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: GetdataService
  ) {
    this.skillsData = this.dataService.getData();
  }

  ngOnInit() {
    // Set formControl for main skill and character name
    this.registerForm = this.formBuilder.group({
      characterName: [''],
      strength: [''],
      dexterity: [''],
      mind: [''],
      presence: ['']
    });
  }

  // To get form control easily
  get f() { return this.registerForm.controls; }


  /**
   * Call When Strength value changes
   * @param value 
   */
  onChangeStrength(value: string): void {
    this.calulateStrengthSkills(Number(value));
    this.showSkillArray = true;
  }

  /**
   * Call When Dexterity value changes
   * @param value 
   */
  onChangeDexterity(value: string): void {
    this.calulateDexteritySkills(Number(value));
    this.showSkillArray = true;

  }

  /**
   * Call When Mind value changes
   * @param value 
   */
  onChangeMind(value: string): void {
    this.calulateMindSkills(Number(value));
    this.showSkillArray = true;

  }

  /**
   * Call When Presence value changes
   * @param value 
   */
  onChangePresence(value: string): void {
    this.calulatePresenceSkills(Number(value));
    this.showSkillArray = true;

  }

  /**
   * 
   * @param value 
   */
  calulateStrengthSkills(value: number): void {
    let strengthSkillFilteredArray = this.skillsData.filter(x => x.title == "Strength");
    let index = this.skillsData.findIndex(x => x.title === "Strength");
    this.skillArray[index] = [];

    if (strengthSkillFilteredArray.length) {
      this.calculateRankValue(strengthSkillFilteredArray, value, index);
    }
  }

  /**
   * 
   * @param value 
   */
  calulateDexteritySkills(value: number): void {
    let dexteritySkillFilteredArray = this.skillsData.filter(x => x.title == "Dexterity");
    let index = this.skillsData.findIndex(x => x.title === "Dexterity");
    this.skillArray[index] = [];
    if (dexteritySkillFilteredArray.length) {
      this.calculateRankValue(dexteritySkillFilteredArray, value, index);
    }

  }

  /**
   * 
   * @param value 
   */
  calulateMindSkills(value: number): void {
    let mindSkillFilteredArray = this.skillsData.filter(x => x.title == "Mind");
    let index = this.skillsData.findIndex(x => x.title === "Mind");
    this.skillArray[index] = [];
    if (mindSkillFilteredArray.length) {
      this.calculateRankValue(mindSkillFilteredArray, value, index);
    }

  }

  /**
   * 
   * @param value 
   */
  calulatePresenceSkills(value: number): void {
    let presencesSkillFilteredArray = this.skillsData.filter(x => x.title == "Presence");
    let index = this.skillsData.findIndex(x => x.title === "Presence");
    this.skillArray[index] = [];
    if (presencesSkillFilteredArray.length) {
      this.calculateRankValue(presencesSkillFilteredArray, value, index);
    }

  }

  /**
   * Calculate and Dispaly Rank Value
   * @param skills 
   * @param value 
   * @param index 
   */
  calculateRankValue(skills, value, index) {
    let rankData = 0;
    let element = skills[0];
    rankData = value / element.subdata.length
    let finalRank = this.setRankValue(rankData);

    let rankName = this.getRankName(finalRank);
    for (let i = 0; i < element.subdata.length; i++) {
      const el = element.subdata[i];
      el.value = rankName
      this.skillArray[index][i] = [];
    }
  }

  /**
   * 
   * @param rankValue 
   * @returns rankName
   */
  getRankName(rankValue: number) {
    if (rankValue == this.UNTRAINED_RANK_VALUE) {
      return 'Untrained';
    } else if (rankValue == this.NOVICE_RANK_VALUE) {
      return 'Novice';
    } else if (rankValue == this.APPRENTICE_RANK_VALUE) {
      return 'Apprentice';
    } else if (rankValue == this.ADEPT_RANK_VALUE) {
      return 'Adept';
    } else if (rankValue == this.EXPERT_RANK_VALUE) {
      return 'Expert';
    } else if (rankValue == this.MASTER_RANK_VALUE) {
      return 'Master';
    }
  }

  /**
   * 
   * @param rankData 
   * @returns RankValue
   */
  setRankValue(rankData: number) {
    if (rankData <= this.UNTRAINED_RANK_VALUE) {
      return this.UNTRAINED_RANK_VALUE;
    } else if (
      rankData == this.LOWER_NOVICE_RANK_BOUND ||
      rankData <= this.UPER_NOVICE_RANK_BOUND) {
      return this.NOVICE_RANK_VALUE;
    } else if (
      rankData == this.LOWER_APPRENTICE_RANK_BOUND ||
      rankData <= this.UPER_APPRENTICE_RANK_BOUND) {
      return this.APPRENTICE_RANK_VALUE;
    } else if (
      rankData == this.LOWER_ADEPT_RANK_BOUND ||
      rankData <= this.UPER_ADEPT_RANK_BOUND) {
      return this.ADEPT_RANK_VALUE;
    } else if (
      rankData == this.LOWER_EXPERT_RANK_BOUND ||
      rankData <= this.UPER_EXPERT_RANK_BOUND) {
      return this.EXPERT_RANK_VALUE;
    } else if (
      rankData == this.LOWER_MASTER_RANK_BOUND ||
      rankData <= this.UPER_MASTER_RANK_BOUND) {
      return this.MASTER_RANK_VALUE;
    } else {
      return this.MASTER_RANK_VALUE;
    }
  }

  /**
   * 
   * @param skillIndex 
   * @param subSkillIndex 
   * @returns RankName
   */
  getRankValue(skillIndex, subSkillIndex) {
    return this.skillsData[skillIndex].subdata[subSkillIndex].value;
  }

  /**
   * Set skillArray to display
   * @param skillIndex 
   * @param subSkillIndex 
   */
  getSkillValue(skillIndex, subSkillIndex) {
    if (this.skillArray.length && this.skillArray[skillIndex] != undefined) {
      let rankValue = Number(this.getRankValueFromName(this.skillsData[skillIndex].subdata[subSkillIndex].value));
      this.skillArray[skillIndex][subSkillIndex] = this.generateSkillValue(rankValue);
    }
  }

  /**
   * 
   * @param rankValue 
   * @returns Skill Value 
   */
  generateSkillValue(rankValue: number) {
    if (rankValue == 0) {
      let num_1 = this.getRandomInt(1, 20);
      let num_2 = this.getRandomInt(1, 20);
      return this.getMinInt(num_1, num_2);
    } else {
      let numberWithRank = (4 + (rankValue - 1) * 2);
      let randomNo = this.getRandomInt(1, 20);
      let randomNoWithRank = this.getMinInt(1, numberWithRank);
      return randomNo + randomNoWithRank;
    }
  }

  /**
   * 
   * @param min 
   * @param max 
   * @returns Random Number
   */
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * 
   * @param num_1 
   * @param num_2 
   * @returns Minimum Number
   */
  getMinInt(num_1, num_2) {
    return Math.min(num_1, num_2);
  }

  /**
   * 
   * @param rankName 
   * @returns RankValue
   */
  getRankValueFromName(rankName) {
    if (rankName == 'Untrained')
      return this.UNTRAINED_RANK_VALUE;
    else if (rankName == 'Novice')
      return this.NOVICE_RANK_VALUE;
    else if (rankName == 'Apprentice')
      return this.APPRENTICE_RANK_VALUE;
    else if (rankName == 'Adept')
      return this.ADEPT_RANK_VALUE;
    else if (rankName == 'Expert')
      return this.EXPERT_RANK_VALUE;
    else
      return this.MASTER_RANK_VALUE;
  }

  /**
   * Scope Function 
   * @param presence 
   * @returns TenacityValue
   */
  getTenacityValue(presence) {
    return this.TENANCITY_ADDITION_FACTOR + presence;
  }

  /**
   * Scope Function 
   * @param strength 
   * @returns VitalityValue
   */
  getVitalityValue(strength) {
    return this.VITALITY_ADDITION_FACTOR + strength;
  }

  /**
   * Scope Function 
   * @param dexterity 
   * @returns EvasionValue
   */
  getEvasionValue(dexterity) {
    return this.EVASION_ADDITION_FACTOR + dexterity;
  }

  /**
   * Scope Function 
   * @param dexterity 
   * @returns ArmorValue
   */
  getArmorValue(dexterity) {
    return this.EVASION_ADDITION_FACTOR + dexterity;
  }

  /**
   * Scope Function 
   * @param dexterity 
   * @param mind 
   * @returns AlacrityValue
   */
  getAlacrityValue(dexterity, mind) {
    return dexterity + mind;
  }

  // addDamage() {
  //   this.totalDamange = + 1;
  //   this.getVitalityValue(this.f.strength.value - 1);
  // }

  /**
   * Show Output of form in alert
   */
  onExport() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    alert('Export Success!! \n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }
}
