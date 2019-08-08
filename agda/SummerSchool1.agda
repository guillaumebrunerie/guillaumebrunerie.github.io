{-# OPTIONS --without-K #-}

open import Agda.Primitive

postulate
  P Q R : Set

modus-ponens : P → (P → Q) → Q
modus-ponens x f = f x

transitivity : (P → Q) → (Q → R) → (P → R)
transitivity f g = λ x → g (f x)


data ℕ : Set where
  zero : ℕ
  succ : ℕ → ℕ

{-# BUILTIN NATURAL ℕ #-}

data List (A : Set) : Set where
  nil : List A
  cons : A → List A → List A

data _≡_ {i : Level} {A : Set i} : (a : A) (b : A) → Set i where
  refl : {a : A} → a ≡ a

concat : {A : Set} {a b c : A} → a ≡ b → b ≡ c → a ≡ c
concat refl refl = refl

f : ℕ → ℕ
f zero = zero
f (succ n) = succ (f n)

_+_ : ℕ → ℕ → ℕ
zero + m = m
succ n + m = succ (n + m)

record Σ {i j : Level} (A : Set i) (B : A → Set j) : Set (i ⊔ j) where
  constructor _,_
  field
    fst : A
    snd : B fst

open Σ

record IsEquiv {i j : Level} {A : Set i} {B : Set j} (f : A → B) : Set (i ⊔ j) where
  field
    left-inverse : B → A
    left-inverse-is-left-inverse : (x : A) → left-inverse (f x) ≡ x
    right-inverse : B → A
    right-inverse-is-right-inverse : (y : B) → f (right-inverse y) ≡ y

open IsEquiv

_≃_ : Set → Set → Set
A ≃ B = Σ (A → B) (λ f → IsEquiv f)

idEquiv : {A : Set} → A ≃ A
fst idEquiv = λ x → x
left-inverse (snd idEquiv) = λ x → x
left-inverse-is-left-inverse (snd idEquiv) = λ _ → refl
right-inverse (snd idEquiv) = λ x → x
right-inverse-is-right-inverse (snd idEquiv) = λ _ → refl

id-to-equiv : (A B : Set) → A ≡ B → A ≃ B
id-to-equiv A B refl = idEquiv

UnivalenceAxiom : Set₁
UnivalenceAxiom = (A B : Set) → IsEquiv (id-to-equiv A B)

postulate
  ua : UnivalenceAxiom

record _×_ (A B : Set) : Set where
  field
    fst : A
    snd : B

open _×_

data Bool : Set where
  true : Bool
  false : Bool

_>_ : ℕ → ℕ → Bool
zero > zero = false
succ n > zero = true
zero > succ m = false
succ n > succ m = n > m

infix 50 _∙_

_∙_ : ℕ → ℕ → ℕ
zero ∙ m = zero
succ n ∙ m = n ∙ m + m

IsPrime : ℕ → Set
IsPrime n = (m k : ℕ) (p : m ∙ k ≡ n) (q : (m > 1) ≡ true) → (2 > k) ≡ true

theorem : (n : ℕ) → Σ ℕ (λ k → ((k > n) ≡ true) × IsPrime k)
fst (theorem n) = {!!}
fst (snd (theorem n)) = {!!}
snd (snd (theorem n)) = {!!}
