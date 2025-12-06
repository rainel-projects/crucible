export const snippets = {
    python: {
        1: [ // Basics & Syntax
            { id: 'py_1_1', title: "Variables & Types", difficulty: "Intro", code: `x = 10\nname = "Crucible"\nis_active = True\nprint(f"{name} status: {is_active}")` },
            { id: 'py_1_2', title: "List Operations", difficulty: "Intro", code: `nums = [1, 2, 3]\nnums.append(4)\nprint(nums[-1])` },
            { id: 'py_1_3', title: "Dictionary Basics", difficulty: "Intro", code: `user = {"id": 1, "rank": "Novice"}\nprint(user.get("rank"))` },
            { id: 'py_1_4', title: "String Slicing", difficulty: "Intro", code: `text = "Hello World"\nprint(text[::-1])\nprint(text[0:5])` },
            { id: 'py_1_5', title: "Simple Math", difficulty: "Intro", code: `a = 10\nb = 3\nprint(f"Div: {a/b:.2f}, Mod: {a%b}")` }
        ],
        5: [ // Control Flow
            { id: 'py_5_1', title: "FizzBuzz Logic", difficulty: "Basic", code: `for i in range(1, 16):\n    if i % 3 == 0 and i % 5 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")` },
            { id: 'py_5_2', title: "While Loop", difficulty: "Basic", code: `count = 5\nwhile count > 0:\n    print(count)\n    count -= 1` },
            { id: 'py_5_3', title: "List Comprehension", difficulty: "Basic", code: `squares = [x**2 for x in range(10)]\nevens = [x for x in squares if x % 2 == 0]` },
            { id: 'py_5_4', title: "Dictionary Iteration", difficulty: "Basic", code: `data = {"a": 1, "b": 2}\nfor k, v in data.items():\n    print(f"{k}: {v}")` }
        ],
        10: [ // Data Structures (Arrays/Strings) - LeetCode Easy
            { id: 'py_10_1', title: "Contains Duplicate", difficulty: "Easy", code: `class Solution:\n    def containsDuplicate(self, nums: List[int]) -> bool:\n        hashset = set()\n        for n in nums:\n            if n in hashset:\n                return True\n            hashset.add(n)\n        return False` },
            { id: 'py_10_2', title: "Valid Anagram", difficulty: "Easy", code: `class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        if len(s) != len(t):\n            return False\n        return sorted(s) == sorted(t)` },
            { id: 'py_10_3', title: "Two Sum", difficulty: "Easy", code: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        prevMap = {}\n        for i, n in enumerate(nums):\n            diff = target - n\n            if diff in prevMap:\n                return [prevMap[diff], i]\n            prevMap[n] = i` }
        ],
        15: [ // Two Pointers - LeetCode Easy
            { id: 'py_15_1', title: "Valid Palindrome", difficulty: "Easy", code: `class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        l, r = 0, len(s) - 1\n        while l < r:\n            if not s[l].isalnum():\n                l += 1\n            elif not s[r].isalnum():\n                r -= 1\n            elif s[l].lower() != s[r].lower():\n                return False\n            else:\n                l, r = l + 1, r - 1\n        return True` },
            { id: 'py_15_2', title: "Max Water Container", difficulty: "Medium", code: `class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        l, r = 0, len(height) - 1\n        res = 0\n        while l < r:\n            res = max(res, min(height[l], height[r]) * (r - l))\n            if height[l] < height[r]:\n                l += 1\n            else:\n                r -= 1\n        return res` }
        ],
        20: [ // Sliding Window - LeetCode Medium
            { id: 'py_20_1', title: "Longest Substring", difficulty: "Medium", code: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        charSet = set()\n        l = 0\n        res = 0\n        for r in range(len(s)):\n            while s[r] in charSet:\n                charSet.remove(s[l])\n                l += 1\n            charSet.add(s[r])\n            res = max(res, r - l + 1)\n        return res` },
            { id: 'py_20_2', title: "Stock Buy Sell", difficulty: "Easy", code: `class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        l, r = 0, 1\n        maxP = 0\n        while r < len(prices):\n            if prices[l] < prices[r]:\n                profit = prices[r] - prices[l]\n                maxP = max(maxP, profit)\n            else:\n                l = r\n            r += 1\n        return maxP` }
        ],
        30: [ // Stack - LeetCode Medium
            { id: 'py_30_1', title: "Valid Parentheses", difficulty: "Easy", code: `class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        closeToOpen = {")": "(", "]": "[", "}": "{"}\n        for c in s:\n            if c in closeToOpen:\n                if stack and stack[-1] == closeToOpen[c]:\n                    stack.pop()\n                else:\n                    return False\n            else:\n                stack.append(c)\n        return True if not stack else False` },
            { id: 'py_30_2', title: "Min Stack", difficulty: "Medium", code: `class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.minStack = []\n    def push(self, val: int) -> None:\n        self.stack.append(val)\n        val = min(val, self.minStack[-1] if self.minStack else val)\n        self.minStack.append(val)\n    def pop(self) -> None:\n        self.stack.pop()\n        self.minStack.pop()` }
        ],
        40: [ // Binary Search - LeetCode Medium
            { id: 'py_40_1', title: "Binary Search", difficulty: "Easy", code: `class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        l, r = 0, len(nums) - 1\n        while l <= r:\n            m = (l + r) // 2\n            if nums[m] > target:\n                r = m - 1\n            elif nums[m] < target:\n                l = m + 1\n            else:\n                return m\n        return -1` },
            { id: 'py_40_2', title: "Search 2D Matrix", difficulty: "Medium", code: `class Solution:\n    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:\n        ROWS, COLS = len(matrix), len(matrix[0])\n        top, bot = 0, ROWS - 1\n        while top <= bot:\n            row = (top + bot) // 2\n            if target > matrix[row][-1]:\n                top = row + 1\n            elif target < matrix[row][0]:\n                bot = row - 1\n            else:\n                break\n        return False` }
        ],
        50: [ // Linked List - LeetCode Medium
            { id: 'py_50_1', title: "Reverse Linked List", difficulty: "Easy", code: `class Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        prev, curr = None, head\n        while curr:\n            nxt = curr.next\n            curr.next = prev\n            prev = curr\n            curr = nxt\n        return prev` },
            { id: 'py_50_2', title: "Merge Two Lists", difficulty: "Easy", code: `class Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        dummy = ListNode()\n        tail = dummy\n        while list1 and list2:\n            if list1.val < list2.val:\n                tail.next = list1\n                list1 = list1.next\n            else:\n                tail.next = list2\n                list2 = list2.next\n            tail = tail.next\n        if list1:\n            tail.next = list1\n        elif list2:\n            tail.next = list2\n        return dummy.next` }
        ]
    },
    javascript: {
        1: [
            { id: 'js_1_1', title: "Variables", difficulty: "Intro", code: `let count = 0;\nconst MAX_VALUE = 100;\nconsole.log(count, MAX_VALUE);` },
            { id: 'js_1_2', title: "Template Literals", difficulty: "Intro", code: `const name = "Dev";\nconsole.log(\`Hello \${name}\`);` },
            { id: 'js_1_3', title: "Arrow Functions", difficulty: "Intro", code: `const add = (a, b) => a + b;\nconsole.log(add(5, 3));` },
            { id: 'js_1_4', title: "Array Map", difficulty: "Intro", code: `const nums = [1, 2, 3];\nconst doubled = nums.map(n => n * 2);` }
        ],
        5: [
            { id: 'js_5_1', title: "Array Filter", difficulty: "Basic", code: `const nums = [1, 2, 3, 4];\nconst evens = nums.filter(n => n % 2 === 0);` },
            { id: 'js_5_2', title: "Object Destructuring", difficulty: "Basic", code: `const user = { id: 1, name: "Neo" };\nconst { name } = user;` },
            { id: 'js_5_3', title: "Promises", difficulty: "Basic", code: `const fetchData = () => {\n  return new Promise(resolve => {\n    setTimeout(() => resolve("Done"), 1000);\n  });\n};` },
            { id: 'js_5_4', title: "Async Await", difficulty: "Basic", code: `async function getData() {\n  const res = await fetch('/api/data');\n  const json = await res.json();\n  return json;\n}` }
        ],
        10: [
            { id: 'js_10_1', title: "Contains Duplicate", difficulty: "Easy", code: `var containsDuplicate = function(nums) {\n    const s = new Set(nums);\n    return s.size !== nums.length;\n};` },
            { id: 'js_10_2', title: "Two Sum", difficulty: "Easy", code: `var twoSum = function(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (map.has(diff)) return [map.get(diff), i];\n        map.set(nums[i], i);\n    }\n};` },
            { id: 'js_10_3', title: "Valid Anagram", difficulty: "Easy", code: `var isAnagram = function(s, t) {\n    if (s.length !== t.length) return false;\n    return s.split('').sort().join('') === t.split('').sort().join('');\n};` }
        ],
        20: [
            { id: 'js_20_1', title: "Best Time to Buy/Sell", difficulty: "Easy", code: `var maxProfit = function(prices) {\n    let minPrice = Infinity;\n    let maxProfit = 0;\n    for (let price of prices) {\n        minPrice = Math.min(minPrice, price);\n        maxProfit = Math.max(maxProfit, price - minPrice);\n    }\n    return maxProfit;\n};` },
            { id: 'js_20_2', title: "Valid Palindrome", difficulty: "Easy", code: `var isPalindrome = function(s) {\n    s = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();\n    let l = 0, r = s.length - 1;\n    while (l < r) {\n        if (s[l] !== s[r]) return false;\n        l++; r--;\n    }\n    return true;\n};` }
        ]
    },
    cpp: {
        1: [
            { id: 'cpp_1_1', title: "Hello World", difficulty: "Intro", code: `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello World";\n    return 0;\n}` },
            { id: 'cpp_1_2', title: "Basic Input", difficulty: "Intro", code: `int x;\ncin >> x;\ncout << "You entered: " << x;` }
        ],
        10: [
            { id: 'cpp_10_1', title: "Two Sum", difficulty: "Easy", code: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> m;\n        for (int i = 0; i < nums.size(); i++) {\n            if (m.count(target - nums[i]))\n                return {m[target - nums[i]], i};\n            m[nums[i]] = i;\n        }\n        return {};\n    }\n};` },
            { id: 'cpp_10_2', title: "Contains Duplicate", difficulty: "Easy", code: `class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        unordered_set<int> s;\n        for (int n : nums) {\n            if (s.count(n)) return true;\n            s.insert(n);\n        }\n        return false;\n    }\n};` }
        ]
    },
    rust: {
        1: [
            { id: 'rs_1_1', title: "Hello World", difficulty: "Intro", code: `fn main() {\n    println!("Hello, world!");\n}` },
            { id: 'rs_1_2', title: "Variables", difficulty: "Intro", code: `fn main() {\n    let x = 5;\n    let y = 10;\n    println!("x = {}, y = {}", x, y);\n}` }
        ],
        10: [
            { id: 'rs_10_1', title: "Two Sum", difficulty: "Easy", code: `use std::collections::HashMap;\n\nimpl Solution {\n    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {\n        let mut map = HashMap::new();\n        for (i, &n) in nums.iter().enumerate() {\n            if let Some(&j) = map.get(&(target - n)) {\n                return vec![j as i32, i as i32];\n            }\n            map.insert(n, i);\n        }\n        vec![]\n    }\n}` }
        ]
    },
    go: {
        1: [
            { id: 'go_1_1', title: "Hello World", difficulty: "Intro", code: `package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello, World!")\n}` },
            { id: 'go_1_2', title: "Variables", difficulty: "Intro", code: `package main\nimport "fmt"\nfunc main() {\n    var i int = 10\n    k := 5\n    fmt.Println(i, k)\n}` }
        ],
        10: [
            { id: 'go_10_1', title: "Two Sum", difficulty: "Easy", code: `func twoSum(nums []int, target int) []int {\n    m := make(map[int]int)\n    for i, n := range nums {\n        if j, ok := m[target-n]; ok {\n            return []int{j, i}\n        }\n        m[n] = i\n    }\n    return nil\n}` }
        ]
    }
};

export const getRandomSnippet = (lang, level, history = []) => {
    const langData = snippets[lang] || snippets.javascript;

    // Find appropriate level bracket (highest bracket <= current level)
    let targetLevel = 1;
    const levels = Object.keys(langData).map(Number).sort((a, b) => a - b);

    for (const l of levels) {
        if (level >= l) {
            targetLevel = l;
        } else {
            break;
        }
    }

    const levelSnippets = langData[targetLevel];

    // Filter out snippets that are in the history
    const availableSnippets = levelSnippets.filter(snippet => !history.includes(snippet.id));

    // If all snippets in this level have been played, reset for this level (allow repeats)
    // OR return a random one from the full list
    if (availableSnippets.length === 0) {
        return levelSnippets[Math.floor(Math.random() * levelSnippets.length)];
    }

    return availableSnippets[Math.floor(Math.random() * availableSnippets.length)];
};

export const getNextUnlock = (level) => {
    // Return the next milestone
    const milestones = [5, 10, 15, 20, 30, 40, 50];
    const next = milestones.find(m => m > level);
    if (!next) return "MAX LEVEL";

    const topics = {
        5: "Control Flow",
        10: "Data Structures",
        15: "Two Pointers",
        20: "Sliding Window",
        30: "Stack & Queue",
        40: "Binary Search",
        50: "Linked Lists"
    };
    return { level: next, topic: topics[next] || "Advanced Algorithms" };
};
