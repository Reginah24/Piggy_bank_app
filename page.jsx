"use client"

import { useState, useEffect } from "react"

export default function SmartSaveBankingApp() {
  const [currentPage, setCurrentPage] = useState("home")
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [depositAmount, setDepositAmount] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const showPage = (page, account = null) => {
    setCurrentPage(page)
    if (account !== null) {
      setSelectedAccount(account)
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleDeposit = () => {
    if (depositAmount && selectedPaymentMethod) {
      alert(`Successfully deposited ${depositAmount} RWF via ${selectedPaymentMethod}`)
      setDepositAmount("")
      setSelectedPaymentMethod("")
      showPage("home")
    }
  }

  const addToKeypad = (digit) => {
    if (digit === "⌫") {
      setDepositAmount((prev) => prev.slice(0, -1))
    } else if (digit === ".") {
      if (!depositAmount.includes(".")) {
        setDepositAmount((prev) => prev + digit)
      }
    } else {
      setDepositAmount((prev) => prev + digit)
    }
  }

  return (
    <div className="phone-container">
      <div className={`screen ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        {/* HOME PAGE */}
        {currentPage === "home" && (
          <div className="page active">
            <div className="status-bar">
              <span>{currentTime}</span>
              <span>●●●●● 100%</span>
            </div>

            <div className="header">
              <div className="logo">
                <div className="logo-icon">S</div>
                <div className="logo-text">SmartSave</div>
              </div>
              <button className="theme-toggle" onClick={toggleTheme}>
                {isDarkMode ? "☀️" : "🌙"}
              </button>
            </div>

            <div className="main-content">
              <div className="greeting">Good morning, Jean</div>
              <div className="subtitle">Your savings are growing strong</div>

              <div className="balance-card" onClick={() => showPage("balance-details")}>
                <div className="balance-header">
                  <div className="balance-label">Total Savings Balance</div>
                  <div className="status-indicator">Secured</div>
                </div>
                <div className="balance-amount">285,750 RWF</div>
                <div className="balance-growth">▲ +5.2% this month • 12,450 RWF growth</div>
              </div>

              <div className="section-title">Active Savings Goals</div>

              <div className="savings-account" onClick={() => showPage("account-details", "motorcycle")}>
                <div className="feature-highlight"></div>
                <div className="account-header">
                  <div className="account-info">
                    <h3>Motorcycle Purchase Fund</h3>
                    <div className="account-type">6-Month Time Deposit • 6.5% APY</div>
                  </div>
                  <div className="lock-status locked">Locked</div>
                </div>
                <div className="progress-section">
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: "74%" }}></div>
                  </div>
                  <div className="progress-details">
                    <span>148,500 RWF saved</span>
                    <span>200,000 RWF target</span>
                  </div>
                </div>
                <div className="account-stats">
                  <div className="stat-item">
                    <div className="stat-value">42 days</div>
                    <div className="stat-label">Until Maturity</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">9,645 RWF</div>
                    <div className="stat-label">Interest Earned</div>
                  </div>
                </div>
              </div>

              <div className="savings-account" onClick={() => showPage("account-details", "emergency")}>
                <div className="account-header">
                  <div className="account-info">
                    <h3>Emergency Fund</h3>
                    <div className="account-type">Flexible Savings • 4.2% APY</div>
                  </div>
                  <div className="lock-status">Flexible</div>
                </div>
                <div className="progress-section">
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: "34%" }}></div>
                  </div>
                  <div className="progress-details">
                    <span>137,250 RWF saved</span>
                    <span>400,000 RWF target</span>
                  </div>
                </div>
                <div className="account-stats">
                  <div className="stat-item">
                    <div className="stat-value">No Limit</div>
                    <div className="stat-label">Time Restriction</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">2,840 RWF</div>
                    <div className="stat-label">Interest Earned</div>
                  </div>
                </div>
              </div>

              <div className="quick-actions">
                <button className="action-btn" onClick={() => showPage("deposit")}>
                  <div className="action-icon deposit-icon">+</div>
                  <div className="action-text">Deposit Funds</div>
                </button>
                <button className="action-btn" onClick={() => showPage("new-goal")}>
                  <div className="action-icon goal-icon">○</div>
                  <div className="action-text">New Goal</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DEPOSIT PAGE */}
        {currentPage === "deposit" && (
          <div className="page active">
            <div className="status-bar">
              <span>{currentTime}</span>
              <span>●●●●● 100%</span>
            </div>

            <div className="header with-back">
              <button className="back-btn" onClick={() => showPage("home")}>
                ←
              </button>
              <div className="page-title">Deposit Funds</div>
            </div>

            <div className="main-content">
              <div className="amount-display">{depositAmount || "0"} RWF</div>

              <div className="keypad">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"].map((digit, index) => (
                  <button key={index} className="keypad-btn" onClick={() => addToKeypad(digit)}>
                    {digit}
                  </button>
                ))}
              </div>

              <div className="payment-methods">
                <div className="section-title">Select Payment Method</div>

                <div
                  className={`payment-method ${selectedPaymentMethod === "MTN Mobile Money" ? "selected" : ""}`}
                  onClick={() => setSelectedPaymentMethod("MTN Mobile Money")}
                >
                  <div className="payment-info">
                    <div className="payment-icon mtn-icon">M</div>
                    <div>
                      <div className="stat-value">MTN Mobile Money</div>
                      <div className="stat-label">**** **** 1234</div>
                    </div>
                  </div>
                  <div>{selectedPaymentMethod === "MTN Mobile Money" ? "✓" : ""}</div>
                </div>

                <div
                  className={`payment-method ${selectedPaymentMethod === "Airtel Money" ? "selected" : ""}`}
                  onClick={() => setSelectedPaymentMethod("Airtel Money")}
                >
                  <div className="payment-info">
                    <div className="payment-icon airtel-icon">A</div>
                    <div>
                      <div className="stat-value">Airtel Money</div>
                      <div className="stat-label">**** **** 5678</div>
                    </div>
                  </div>
                  <div>{selectedPaymentMethod === "Airtel Money" ? "✓" : ""}</div>
                </div>

                <div
                  className={`payment-method ${selectedPaymentMethod === "Bank Transfer" ? "selected" : ""}`}
                  onClick={() => setSelectedPaymentMethod("Bank Transfer")}
                >
                  <div className="payment-info">
                    <div className="payment-icon bank-icon">B</div>
                    <div>
                      <div className="stat-value">Bank Transfer</div>
                      <div className="stat-label">BK **** 9012</div>
                    </div>
                  </div>
                  <div>{selectedPaymentMethod === "Bank Transfer" ? "✓" : ""}</div>
                </div>
              </div>

              <button
                className="primary-btn"
                onClick={handleDeposit}
                disabled={!depositAmount || !selectedPaymentMethod}
              >
                Confirm Deposit
              </button>
            </div>
          </div>
        )}

        {/* ACCOUNT DETAILS PAGE */}
        {currentPage === "account-details" && (
          <div className="page active">
            <div className="status-bar">
              <span>{currentTime}</span>
              <span>●●●●● 100%</span>
            </div>

            <div className="header with-back">
              <button className="back-btn" onClick={() => showPage("home")}>
                ←
              </button>
              <div className="page-title">
                {selectedAccount === "motorcycle" ? "Motorcycle Fund" : "Emergency Fund"}
              </div>
            </div>

            <div className="main-content">
              <div className="balance-card">
                <div className="balance-header">
                  <div className="balance-label">Current Balance</div>
                  <div className="status-indicator">{selectedAccount === "motorcycle" ? "Locked" : "Flexible"}</div>
                </div>
                <div className="balance-amount">{selectedAccount === "motorcycle" ? "148,500 RWF" : "137,250 RWF"}</div>
                <div className="balance-growth">
                  Interest Rate: {selectedAccount === "motorcycle" ? "6.5%" : "4.2%"} APY
                </div>
              </div>

              <div className="section-title">Recent Transactions</div>

              <div className="transaction-item">
                <div className="transaction-info">
                  <div className="transaction-icon deposit-transaction">+</div>
                  <div className="transaction-details">
                    <h4>Monthly Deposit</h4>
                    <div className="transaction-date">Dec 15, 2024</div>
                  </div>
                </div>
                <div className="transaction-amount positive">+25,000 RWF</div>
              </div>

              <div className="transaction-item">
                <div className="transaction-info">
                  <div className="transaction-icon deposit-transaction">+</div>
                  <div className="transaction-details">
                    <h4>Interest Payment</h4>
                    <div className="transaction-date">Dec 1, 2024</div>
                  </div>
                </div>
                <div className="transaction-amount positive">+1,245 RWF</div>
              </div>

              <button className="primary-btn" onClick={() => showPage("deposit")}>
                Make Deposit
              </button>

              {selectedAccount === "emergency" && <button className="secondary-btn">Withdraw Funds</button>}
            </div>
          </div>
        )}

        {/* BALANCE DETAILS PAGE */}
        {currentPage === "balance-details" && (
          <div className="page active">
            <div className="status-bar">
              <span>{currentTime}</span>
              <span>●●●●● 100%</span>
            </div>

            <div className="header with-back">
              <button className="back-btn" onClick={() => showPage("home")}>
                ←
              </button>
              <div className="page-title">Balance Overview</div>
            </div>

            <div className="main-content">
              <div className="balance-card">
                <div className="balance-header">
                  <div className="balance-label">Total Portfolio Value</div>
                  <div className="status-indicator">All Accounts</div>
                </div>
                <div className="balance-amount">285,750 RWF</div>
                <div className="balance-growth">▲ +5.2% this month • 12,450 RWF growth</div>
              </div>

              <div className="section-title">Account Breakdown</div>

              <div className="goal-card">
                <div className="account-header">
                  <div className="account-info">
                    <h3>Motorcycle Purchase Fund</h3>
                    <div className="account-type">148,500 RWF • 52% of total</div>
                  </div>
                </div>
                <div className="progress-section">
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: "52%" }}></div>
                  </div>
                </div>
              </div>

              <div className="goal-card">
                <div className="account-header">
                  <div className="account-info">
                    <h3>Emergency Fund</h3>
                    <div className="account-type">137,250 RWF • 48% of total</div>
                  </div>
                </div>
                <div className="progress-section">
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: "48%" }}></div>
                  </div>
                </div>
              </div>

              <div className="section-title">Growth Chart</div>
              <div className="chart-container">
                {[60, 75, 45, 90, 100, 85, 95].map((height, index) => (
                  <div key={index} className="chart-bar" style={{ height: `${height}%` }}></div>
                ))}
              </div>
              <div className="chart-labels">
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
              </div>
            </div>
          </div>
        )}

        {/* NEW GOAL PAGE */}
        {currentPage === "new-goal" && (
          <div className="page active">
            <div className="status-bar">
              <span>{currentTime}</span>
              <span>●●●●● 100%</span>
            </div>

            <div className="header with-back">
              <button className="back-btn" onClick={() => showPage("home")}>
                ←
              </button>
              <div className="page-title">Create New Goal</div>
            </div>

            <div className="main-content">
              <div className="form-group">
                <label className="form-label">Goal Name</label>
                <input type="text" className="form-input" placeholder="e.g., New Car, Vacation" />
              </div>

              <div className="form-group">
                <label className="form-label">Target Amount (RWF)</label>
                <input type="number" className="form-input" placeholder="500,000" />
              </div>

              <div className="form-group">
                <label className="form-label">Target Date</label>
                <input type="date" className="form-input" />
              </div>

              <button
                className="primary-btn"
                onClick={() => {
                  alert("Goal created successfully!")
                  showPage("home")
                }}
              >
                Create Savings Goal
              </button>
            </div>
          </div>
        )}

        {/* BOTTOM NAVIGATION */}
        <div className="bottom-nav">
          <div className={`nav-item ${currentPage === "home" ? "active" : ""}`} onClick={() => showPage("home")}>
            <span className="nav-icon">🏠</span>
            <span className="nav-label">Home</span>
          </div>
          <div
            className={`nav-item ${currentPage === "transactions" ? "active" : ""}`}
            onClick={() => showPage("transactions")}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-label">Activity</span>
          </div>
          <div
            className={`nav-item ${currentPage === "analytics" ? "active" : ""}`}
            onClick={() => showPage("analytics")}
          >
            <span className="nav-icon">📈</span>
            <span className="nav-label">Analytics</span>
          </div>
          <div
            className={`nav-item ${currentPage === "settings" ? "active" : ""}`}
            onClick={() => showPage("settings")}
          >
            <span className="nav-icon">⚙️</span>
            <span className="nav-label">Settings</span>
          </div>
        </div>
      </div>
    </div>
  )
}

