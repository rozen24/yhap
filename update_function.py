import re

with open('dashboard.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the buildNocturnalEmissionSection function
old_func_start = 'function buildNocturnalEmissionSection() {'
new_func = '''function buildNocturnalEmissionSection() {
  const hygiene = [
    { icon: '🧼', accent: 'teal',   bn: 'শরীর পরিষ্কার করে কাপড় পরিবর্তন করতে হবে।', en: 'Clean body and change clothes when needed.' },
    { icon: '🎯', accent: 'sky',    bn: 'নিজেকে বিভিন্ন ধরনের কাজে (পড়াশোনার বাইরে ভালো বই পড়া, খেলাধুলা/ব্যায়াম, উন্নয়নমূলক/সেবামূলক কাজ, ধর্মীয় কাজ) সম্পৃক্ত করতে হবে।', en: 'Engage in various activities (reading, sports, service work, religious activities) beyond studies.' },
    { icon: '🚿', accent: 'sky',    bn: 'প্রতিদিন গোসলের সময় যৌনাঙ্গ পরিষ্কার করতে হবে। যদি পেনিসের অগ্রভাগে বাড়তি চামড়া থাকে, সেটাও পরিষ্কার করতে হবে।', en: 'Clean genitals daily during shower, including under the foreskin if present.' },
    { icon: '👕', accent: 'slate',  bn: 'প্রতিদিন পরিষ্কার আন্ডারওয়্যার ব্যবহার করতে হবে।', en: 'Wear clean underwear every day.' },
    { icon: '⛔', accent: 'rose',   bn: 'যৌনাঙ্গ বা মলদ্বারের ভেতরে কোনো ধরনের অপরিষ্কার বস্তু প্রবেশ করানো যাবে না।', en: 'Do not insert unclean objects into genitals or rectum.' },
    { icon: '🙏', accent: 'rose',   bn: 'অপরিষ্কার হাতে কখনই নিজের যৌনাঙ্গ ধরা যাবে না।', en: 'Never touch genitals with unclean hands.' },
    { icon: '🥗', accent: 'green',  bn: 'বয়ঃসন্ধিকালীন বৃদ্ধির কারণে এসময় ছেলেদের প্রচুর পুষ্টিকর খাবার খেতে হবে।', en: 'Eat nutritious food regularly due to growth during adolescence.' },
  ];

  const selfControl = [
    { icon: '❤️', accent: 'rose',   bn: 'বয়ঃসন্ধিকালে বিপরীত লিঙ্গের প্রতি আকর্ষণ অনুভব করা স্বাভাবিক। তবে অবশ্যই মানুষ হিসেবে নিজেকে সংযত রাখতে হবে।', en: 'Attraction to opposite gender is natural, but self-control is essential.' },
    { icon: '🤐', accent: 'amber',  bn: 'এসময় রাস্তাঘাটে বা স্কুল কলেজের সামনে মেয়েদের আাজেবাজে কথা বলে বা শীষ দিয়ে যৌনহয়রানি করা যাবে না।', en: 'Do not make inappropriate comments or harass girls in public places or near school.' },
    { icon: '⛔', accent: 'red',    bn: 'সুযোগ পেয়ে মেয়েদের শরীরের স্পর্শকাতর স্থানে হাত দেয়া যাবে না।', en: 'Never touch sensitive body parts of girls without consent.' },
    { icon: '🛑', accent: 'red',    bn: 'কোনো অবস্থাতেই বলপ্রয়োগ করে কারো সঙ্গে যৌন সম্পর্ক স্থাপন করা যাবে না।', en: 'Never engage in any form of sexual coercion or assault.' },
    { icon: '🚫', accent: 'indigo', bn: 'খারাপ বন্ধুদের প্ররোচনায় পতিতালয় যাওয়া যাবে না।', en: 'Do not visit brothels under peer pressure.' },
  ];

  const renderCards = (items) => items.map(it => `
    <article class="role-card role-card--${it.accent}">
      <div class="role-card__icon" aria-hidden="true">${it.icon}</div>
      <p class="role-card__text bn">${it.bn}</p>
      <p class="role-card__text en">${it.en}</p>
    </article>`).join('');

  return `
  <!-- SECTION 1: Nocturnal Emission Management -->
  <section class="role-section" aria-label="Management of nocturnal emissions">
    <div class="role-section__header role-section__header--teal">
      <div class="role-section__icon" aria-hidden="true">🌙</div>
      <div class="role-section__titles">
        <h2 class="role-section__title bn">ছেলেদের স্বপ্নে বীর্যপাতের ব্যাবস্থাপনা</h2>
        <h2 class="role-section__title en">Management of Nocturnal Emissions in Boys</h2>
        <p class="role-section__sub bn">সঠিক যত্ন এবং স্বাস্থ্যবিধির সাতটি গুরুত্বপূর্ণ নিয়ম</p>
        <p class="role-section__sub en">Seven important hygiene and care guidelines</p>
      </div>
    </div>
    <div class="role-section__body">
      <div class="role-grid">${renderCards(hygiene)}</div>
    </div>
  </section>

  <!-- SECTION 2: Self-Control and Restraint -->
  <section class="role-section" aria-label="Self-control and social responsibility">
    <div class="role-section__header role-section__header--violet">
      <div class="role-section__icon" aria-hidden="true">💪</div>
      <div class="role-section__titles">
        <h2 class="role-section__title bn">নিজেকে সংযত রাখা</h2>
        <h2 class="role-section__title en">Self-Control and Restraint</h2>
        <p class="role-section__sub bn">সামাজিক দায়িত্ব এবং মানসিক পরিপক্কতার পাঁচটি বিষয়</p>
        <p class="role-section__sub en">Five important principles of social responsibility</p>
      </div>
    </div>
    <div class="role-section__body">
      <div class="role-grid">${renderCards(selfControl)}</div>
    </div>
  </section>

  <!-- HIGHLIGHTED BOX -->
  <div class="repro-highlight repro-highlight--amber" style="margin-top: 20px; margin-bottom: 12px;">
    <span class="repro-highlight__icon">⚠️</span>
    <span>
      <span class="bn">মনে রাখতে হবে, এসব অসংযত কর্মকান্ডের কারনে স্বাস্থ্যের ক্ষতি হওয়া ও যৌনবাহিত রোগের ঝুকি বেড়ে যাওয়া ছাড়াও সামাজিকভাবে হেয়-প্রতিপন্ন হতে হয়।</span>
      <span class="en">Remember, uncontrolled behavior not only damages health and increases risk of sexually transmitted diseases, but also leads to social disgrace and loss of respect.</span>
    </span>
  </div>
  `;
}'''

# Find the old function
pattern = r'function buildNocturnalEmissionSection\(\) \{[^}]*(?:\{[^}]*\}[^}]*)*\n\}'

# Use regex to find and replace
content = re.sub(
    pattern,
    new_func,
    content,
    flags=re.DOTALL
)

with open('dashboard.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Function updated successfully")
