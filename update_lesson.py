#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

# Read the file
with open('dashboard.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the buildEmergingReEmergingLessonSection function
# Look for the function and replace its body

pattern = r'function buildEmergingReEmergingLessonSection\(\) \{.*?(?=\n      function buildPesticide)'

replacement = '''function buildEmergingReEmergingLessonSection() {
        const emergingItems = [
          { icon: '🦠', accent: 'rose', bn: 'কোভিড-১৯', en: 'COVID-19' },
          { icon: '🧬', accent: 'amber', bn: 'নিপাহ ভাইরাস', en: 'Nipah virus' },
          { icon: '🦟', accent: 'teal', bn: 'জিকা ভাইরাস ইত্যাদি।', en: 'Zika virus, etc.' }
        ];

        const reEmergingItems = [
          { icon: '🦟', accent: 'rose', bn: 'ডেঙ্গু', en: 'Dengue' },
          { icon: '🫁', accent: 'amber', bn: 'যক্ষ্মা (TB)', en: 'Tuberculosis (TB)' },
          { icon: '💧', accent: 'teal', bn: 'কলেরা ইত্যাদি।', en: 'Cholera, etc.' }
        ];

        const renderCards = (items) => items.map((item) => `
          <article class="role-card role-card--${item.accent}">
            <div class="role-card__icon" aria-hidden="true">${item.icon}</div>
            <div class="role-card__content">
              <h4 class="role-card__title bn">${item.bn}</h4>
              <h4 class="role-card__title en">${item.en}</h4>
            </div>
          </article>
        `).join('');

        return `
        <div style="display:grid; gap:20px;">
          <div class="app-intro-box">
            <div class="app-intro-icon" aria-hidden="true">🦠</div>
            <div class="app-intro-titles" style="justify-content:center;">
              <p class="app-intro-title bn">বাংলাদেশ বিগত বছরগুলোতে সংক্রামক রোগ, অসংক্রামক রোগ সহ অনেক ইমারজিং এবং রি-ইমারজিং রোগের মুখোমুখি হয়েছে।</p>
              <p class="app-intro-title en">Bangladesh has faced many emerging and re-emerging diseases in recent years, including infectious and non-communicable diseases.</p>
            </div>
          </div>

          <section class="role-section" aria-label="Emerging diseases" style="margin-top:0;">
            <div class="role-section__header role-section__header--rose">
              <div class="role-section__icon" aria-hidden="true">🧫</div>
              <div class="role-section__titles">
                <h2 class="role-section__title bn">ইমারজিং বা উদীয়মান রোগ</h2>
                <h2 class="role-section__title en">Emerging or Emerging Diseases</h2>
                <p class="role-section__sub bn">যে সব রোগ সম্প্রতি প্রথমবারের মতো মানুষের মধ্যে শনাক্ত হয়েছে, অথবা আগে ছিল না—সেসব রোগকে ইমারজিং বা উদীয়মান রোগ বলা হয়। উদাহরণ:</p>
                <p class="role-section__sub en">Diseases that have been identified for the first time in humans recently, or that did not exist before, are called emerging diseases. Examples:</p>
              </div>
            </div>
            <div class="role-section__body">
              <div class="role-grid">
                ${renderCards(emergingItems)}
              </div>
            </div>
          </section>

          <section class="role-section" aria-label="Re-emerging diseases" style="margin-top:0;">
            <div class="role-section__header role-section__header--amber">
              <div class="role-section__icon" aria-hidden="true">♻️</div>
              <div class="role-section__titles">
                <h2 class="role-section__title bn">রি-ইমারজিং বা পুনরুদ্ভুত রোগ</h2>
                <h2 class="role-section__title en">Re-emerging or Re-emerging Diseases</h2>
                <p class="role-section__sub bn">যে সব রোগ আগে নিয়ন্ত্রণে ছিল বা প্রায় বিলুপ্ত হয়ে গিয়েছিল, কিন্তু পুনরায় বৃদ্ধি পেয়ে স্বাস্থ্যঝুঁকি সৃষ্টি করছে, সেগুলোকে রি-ইমারজিং বা পুনরুদ্ভুত রোগ বলা হয়। উদাহরণ:</p>
                <p class="role-section__sub en">Diseases that were once under control or nearly eradicated, but have reappeared and are again creating health risks, are called re-emerging diseases. Examples:</p>
              </div>
            </div>
            <div class="role-section__body">
              <div class="role-grid">
                ${renderCards(reEmergingItems)}
              </div>
            </div>
          </section>

          <section class="role-section" aria-label="Deliberately emerging diseases" style="margin-top:0;">
            <div class="role-section__header role-section__header--teal">
              <div class="role-section__icon" aria-hidden="true">⚠️</div>
              <div class="role-section__titles">
                <h2 class="role-section__title bn">ডেলিবারেটলি ইমারজিং বা ইচ্ছাকৃতভাবে উদ্ভূত রোগ</h2>
                <h2 class="role-section__title en">Deliberately Emerging or Intentionally Created Diseases</h2>
                <p class="role-section__sub bn">এটি হলো এমন সংক্রামক ব্যাধি যা কোনো রোগজীবাণু (ব্যাকটেরিয়া, ভাইরাস বা টক্সিন) ইচ্ছাকৃতভাবে, উদ্দেশ্যপ্রণোদিতভাবে বা কোনো অশুভ উদ্দেশ্যে (যেমন- সন্ত্রাসবাদ) জনসাধারণের মধ্যে ছড়িয়ে দেওয়া হয়।</p>
                <p class="role-section__sub en">This refers to infectious diseases that are deliberately, intentionally, or maliciously spread among the public using a pathogen such as bacteria, viruses, or toxins, for example for terrorism.</p>
              </div>
            </div>
            <div class="role-section__body">
              <img src="images/emerging.png" alt="Emerging and re-emerging diseases" style="width:100%; max-width: 960px; margin: 0 auto; border-radius: 18px; box-shadow: 0 12px 32px rgba(0,0,0,0.12); display:block; object-fit:cover;" loading="lazy" decoding="async" />
            </div>
          </section>
        </div>
        `;
      }

      function buildPesticide'''

# Perform the replacement
new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Write back
with open('dashboard.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✓ Replacement completed successfully!")
